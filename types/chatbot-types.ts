export interface ChatbotMessageProps {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  metadata?: {
    reactions?: string[];
    isDelivered?: boolean;
    isRead?: boolean;
  };
}

export interface ChatbotProps {
  message: ChatbotMessageProps;
  now: Date;
  isNew?: boolean;
  listEndRef: React.RefObject<HTMLDivElement | null>;
  isDelivered?: boolean;
  onReaction?: (messageId: string, emoji: string) => void;
  reactions?: string[];
}

export interface SysMessageProps {
  role: "system";
  content: string;
}

export interface MarkdownProps {
  content: string;
  isBot: boolean;
}
