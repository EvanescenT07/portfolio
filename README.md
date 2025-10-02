# Portfolio v3 — Next.js App with Chatbot and Ambient Audio

Personal portfolio built with the Next.js App Router, featuring:

- A server-side chatbot for portfolio Q&A
- Ambient lofi audio player with playlist, controls, and a settings modal
- Modern UI components, theming, and animations
- Typed, modular sections for projects, experience, and social links

Live with sensible defaults for local dev and ready to deploy on Vercel or any Node host.

## Tech stack

- Framework: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4, PostCSS
- Theming: next-themes (light/dark)
- UI/UX: Radix UI primitives (slider, tooltip, label), framer-motion/motion, lucide-react icons
- Content: react-markdown + remark-gfm + rehype-sanitize
- Chatbot: Server route using openai v5 client (supports custom base URL/providers)
- HTTP: axios
- Dev: Turbopack dev server
- Linting: ESLint flat config (Next.js + TypeScript)

## Features

- Portfolio content
  - Data-driven sections for academic, experience, projects, social media, and tech stack under `components/data/*`
  - Friendly homepage components (hero, greeting, footer, etc.)
- Chatbot
  - API route at `/api/bot` with server-side call to a chat completion model
  - Configurable model and base URL via environment variables
  - Best-effort per-IP rate limiting in production
  - Frontend hook `hooks/caffbot.ts` with `CaffBot(endpoint).SendChat(...)`
- Ambient audio
  - Playlist in `data/playlist.ts` mapped to `public/audio/*`
  - Global audio context, playback controls, volume control, and a settings modal
- Theming and layout
  - Dark/light theme provider
  - Responsive layout with a navigation bar and polished UI components

## Project structure

- `app/`
  - `page.tsx` — landing page
  - `api/bot/route.ts` — chatbot API
  - `layout.tsx`, `globals.css`, `not-found.tsx`, `robots.ts`, `sitemap.ts`
- `components/`
  - `chatbot/` — chat UI and markdown rendering
  - `overlay/` — modals (settings, confirmations, experiences)
  - `ui/` — reusable UI: audio player, slider, inputs, buttons, etc.
  - `theme/` — theme provider and toggle
  - `layout/` — navigation, logo
  - `data/` — typed data blocks for portfolio sections
- `hooks/` — `caffbot.ts`, `autoscroll.ts`, `timestamp.ts`, `useLocalStorage.ts`
- `data/` — `playlist.ts` playlist sources
- `lib/` — `site.ts` helpers (base URL resolution), `utils.ts`
- `public/` — static assets (images, docs, audio)

## Getting started

Prerequisites:

- Node.js 18.17+ (or 20+)
- Package manager: npm, pnpm, or bun

Install dependencies:

```powershell
# npm
npm install

# pnpm
pnpm install

# bun
bun install
```

Run the dev server (Turbopack):

```powershell
# npm
npm run dev --turbo

# bun
bun run dev --turbo
```

Build and start:

```powershell
# build
bun run build

# start
bun run start
```

Lint:

```powershell
bun run lint
```

Open http://localhost:3000 to view the site.

## Environment variables

Create a `.env.local` in the project root (or `.env` if you prefer). The chatbot will return a 500 error if required vars are missing.

Required for chatbot:

- `CHATBOT_API_KEY` — your API key (OpenAI, OpenRouter, or compatible provider)
- `OPENAI_API_BASE_URL` — base URL for the chat completions API (e.g., `https://api.openai.com/v1` or `https://openrouter.ai/api/v1`)
- `CHATBOT_MODEL` — primary model ID (e.g., `gpt-4o-mini`)

Optional:

- `CHATBOT_FALLBACK_MODEL` — fallback model ID if primary fails
- `SITE_URL` — full site URL used in headers (fallbacks to `NEXT_PUBLIC_VERCEL_URL` or `http://localhost:3000`)
- `NEXT_PUBLIC_VERCEL_URL` — set by Vercel (no protocol), used by `lib/site.ts` to infer base URL

Example `.env.local`:

```dotenv
# Chatbot (server)
CHATBOT_API_KEY=sk-your-key
OPENAI_API_BASE_URL=https://api.openai.com/v1
CHATBOT_MODEL=gpt-4o-mini
CHATBOT_FALLBACK_MODEL=gpt-4o-mini

# Site URL (used for headers + SSR helpers)
SITE_URL=http://localhost:3000
# or (on Vercel) NEXT_PUBLIC_VERCEL_URL=your-app.vercel.app
```

Security note: never expose `CHATBOT_API_KEY` to the client; keep it only in server-side environment.

## Chatbot API

- Endpoint: `POST /api/bot`
- Request body:

```json
{
  "messages": [{ "role": "user", "content": "Tell me about your projects." }]
}
```

- Roles: `"user"` or `"assistant"` accepted in input; the server adds its own `"system"` prompt.
- Response:

```json
{ "messages": "Text answer from the assistant..." }
```

- Rate limit: best-effort per-IP (30 req/min) in production; not durable across serverless instances.
- Errors:
  - 400 — invalid payload
  - 429 — rate limited
  - 500 — model/config/error upstream

Client-side helper (already included):

```ts
import { CaffBot } from "@/hooks/caffbot";

const { SendChat } = CaffBot("/api/bot");
const reply = await SendChat([{ role: "user", content: "Hi!" }]);
```

## Audio player

- Playlist defined in `data/playlist.ts` with `src` pointing to files under `public/audio/*`
- Controls in `components/ui/` (AudioControl, VolumeSlider, Playlist)
- Settings modal in `components/overlay/setting-modal.tsx`
- Global audio context at `components/ui/audio-context.tsx`

To add a new track:

1. Drop the file into `public/audio/`
2. Append a new `Track` to `myPlaylist` in `data/playlist.ts`
3. Optionally run `validatePlaylist()` in dev to ensure required fields are present

## Development notes

- TypeScript config uses `moduleResolution: bundler` and Next’s TS plugin
- ESLint extends `next/core-web-vitals` and `next/typescript`, with strict unused-variable checks
- `lib/site.ts` normalizes base URL for SSR and API headers
- `next.config.ts` includes image settings tuned for quality

## Deployment

- Vercel: push the repo and add environment variables in Project Settings → Environment Variables. The app uses App Router and is Vercel-ready.
- Custom Node host: run `npm run build` then `npm run start`. Ensure env vars are present and a Node 18.17+ runtime is used.
- Image optimization and API routes work out of the box with Next.js server.

## Troubleshooting

- Chatbot returns 500:
  - Verify `CHATBOT_API_KEY`, `OPENAI_API_BASE_URL`, and `CHATBOT_MODEL` are set
  - Check that the chosen model is available at the configured base URL
- 429 Too Many Requests:
  - You hit the per-IP limiter; wait a minute and retry
- Base URL issues:
  - If deploying on Vercel without a custom domain, ensure `NEXT_PUBLIC_VERCEL_URL` is set by the platform or set `SITE_URL` yourself
