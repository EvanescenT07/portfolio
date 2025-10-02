import { NextResponse } from "next/server";
import OpenAI from "openai";

const API_KEY = process.env.CHATBOT_API_KEY;
const BASE_URL = process.env.OPENAI_API_BASE_URL;
const MODEL = process.env.CHATBOT_MODEL;
const FALLBACK_MODEL = process.env.CHATBOT_FALLBACK_MODEL;

const client = new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
    "X-Title": "Portfolio Chatbot",
  },
});

const SYS_PROMPT =
  "You are a helpful assistant that helps people find information about Fikar's portfolio website, including his experience, projects, and skills. Answer concisely. If the question is not related to the portfolio, keep it brief. Avoid toxic/hate/violence/racist/discrimination/political/religion/adult/sexual/drugs/illegal/self-harm.";

type ChatRole = "system" | "user" | "assistant";
type ChatMsg = { role: ChatRole; content: string };
type ChatRequest = { messages: unknown };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function toRole(v: unknown): Exclude<ChatRole, "system"> {
  const r = typeof v === "string" ? v.toLowerCase() : "";
  return r === "assistant" ? "assistant" : "user";
}

function toContent(v: unknown): string {
  return String(v ?? "").slice(0, 8000);
}

function normalizeMessages(input: unknown): ChatMsg[] {
  if (!Array.isArray(input)) return [];
  return input.map((m: unknown) => {
    const role = isObject(m) ? toRole(m.role) : "user";
    const content = isObject(m) ? toContent(m.content) : "";
    return { role, content };
  });
}

// Relaxed per-IP limiter (best-effort; serverless/stateless caveat)
const isProd = process.env.NODE_ENV === "production";
const windowMs = 60_000;
const maxReq = 30;
const hits = new Map<string, { count: number; ts: number }>();

function rateLimited(ip: string): boolean {
  if (!isProd) return false;
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  if (rec.count >= maxReq) return true;
  rec.count += 1;
  return false;
}

async function callModel(model: string, messages: ChatMsg[]) {
  return client.chat.completions.create({
    model,
    messages: [{ role: "system", content: SYS_PROMPT }, ...messages],
    temperature: 0.6,
  });
}

function getNumber(v: unknown): number | undefined {
  return typeof v === "number" ? v : undefined;
}

function getStatusFromError(err: unknown): number {
  if (isObject(err)) {
    const status = getNumber((err as Record<string, unknown>).status);
    if (status) return status;
    const code = getNumber((err as Record<string, unknown>).code);
    if (code) return code;
    const resp = (err as Record<string, unknown>).response;
    if (isObject(resp)) {
      const rStatus = getNumber(resp.status);
      if (rStatus) return rStatus;
    }
  }
  return 500;
}

function getMessageFromError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (isObject(err) && typeof err.message === "string") return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

export async function POST(req: Request) {
  try {
    if (!API_KEY || !BASE_URL || !MODEL) {
      return NextResponse.json(
        {
          error: "Server misconfiguration: missing API key, base URL, or model",
        },
        { status: 500 }
      );
    }

    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      "anon";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests, slow down." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as ChatRequest | null;
    const userMessages = normalizeMessages(body?.messages);

    if (userMessages.length === 0) {
      return NextResponse.json(
        {
          error:
            "Invalid message format. Expected { messages: Array<{role,content}> }",
        },
        { status: 400 }
      );
    }

    // Retry with small backoff and optional fallback model
    const MAX_RETRIES = 2;
    let lastErr: unknown;
    const modelsToTry = [MODEL, FALLBACK_MODEL].filter(
      (m): m is string => typeof m === "string" && m.length > 0
    );

    for (const mdl of modelsToTry) {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          const resp = await callModel(mdl, userMessages);
          const assistant = resp.choices?.[0]?.message?.content ?? "";
          return NextResponse.json({ messages: assistant });
        } catch (e: unknown) {
          lastErr = e;
          const status = getStatusFromError(e);
          if (status === 429) {
            // exponential backoff: 400ms, 800ms, 1600ms...
            const delay = 400 * Math.pow(2, attempt);
            await new Promise((r) => setTimeout(r, delay));
            continue;
          }
          // non-429 error, try next model or fail
          break;
        }
      }
    }

    // If we exhausted retries/fallback
    const status = getStatusFromError(lastErr);
    const msg =
      status === 429
        ? "Rate limit exceeded, try again shortly."
        : "Failed to process request";
    try {
      // Avoid leaking sensitive details; log minimal context
      const safeMsg = getMessageFromError(lastErr);
      console.error("Chat API error:", status, safeMsg);
    } catch {
      // ignore logging failure
    }
    return NextResponse.json({ error: msg }, { status });
  } catch (e: unknown) {
    try {
      console.error("Chat route fatal error:", getMessageFromError(e));
    } catch {
      // ignore logging failure
      
    }
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
