import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { MarkdownProps } from "@/types/chatbot-types";

export const ChatMarkdown = ({ content }: MarkdownProps) => (
  <div
    className={[
      "prose prose-sm max-w-none",
      "[color:inherit] [&_*]:[color:inherit]",
      "[&_a]:underline",
    ].join(" ")}
  >
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
      {content}
    </ReactMarkdown>
  </div>
);
