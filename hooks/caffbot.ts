import axios from "axios";

type ChatRole = "user" | "assistant";
type ChatResponse = { messages: string };

export function CaffBot(endpoint: string) {
  const client = axios.create({
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });

  const SendChat = async (payload: { role: ChatRole; content: string }[]) => {
    try {
      const { data } = await client.post<ChatResponse>(endpoint, {
        messages: payload,
      });
      if (typeof data?.messages !== "string") {
        throw new Error("Invalid API response payload");
      }
      return data.messages;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 429) {
          throw new Error("Rate limit exceeded. Try again later.");
        }
      }
      throw new Error("Failed to reach chatbot service.");
    }
  };

  return { SendChat };
}
