"use client";

import { AutoScroll } from "@/hooks/autoscroll";
import { ChatbotMessageProps } from "@/types/chatbot-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { ConfirmationModal } from "@/components/overlay/confirmation-modal";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CaffBot } from "@/hooks/caffbot";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  Mic,
  MicOff,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { ChatBubble } from "./chat-bubble";
import { ModalConfirmation } from "../ui/confirmation";

export const FloatingChatbot = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessageProps[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(new Date());
  const [query, setQuery] = useState("");
  const [reactions, setReactions] = useState<{ [messageId: string]: string[] }>(
    {}
  );
  const [isRecording, setIsRecording] = useState(false);

  // Refs
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

  // Helpers
  const { scrollToBottom } = AutoScroll(listEndRef);
  const { SendChat } = CaffBot("/api/bot");

  // Confirmation modal controller
  const {
    isOpen: isModalOpen,
    modalProps,
    openModal,
    closeModal,
    handleConfirm,
  } = ConfirmationModal();

  // Speech recognition
  const {
    listening,
    browserSupportsSpeechRecognition,
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  // Persist messages
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!messages.length) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem("caffbot-messages", JSON.stringify(messages));
      } catch {
        toast.error("Failed to save chat history.");
      }
      saveTimer.current = null;
    }, 400);
  }, [messages]);

  // Load messages on mount
  useEffect(() => {
    const SavedMessage = localStorage.getItem("caffbot-messages");
    if (SavedMessage) {
      try {
        const parsed: ChatbotMessageProps[] = JSON.parse(SavedMessage);
        setMessages(parsed);
      } catch {
        // If corrupted, reset
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm CaffBot, your personal assistant. How can I help you today?",
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
          },
        ]);
        localStorage.removeItem("caffbot-messages");
      }
    } else {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm CaffBot, your personal assistant. How can I help you today?",
          createdAt: new Date().toISOString(),
          id: crypto.randomUUID(),
        },
      ]);
    }
  }, []);

  // Search filter
  const SearchMessage = useMemo(() => {
    if (!query.trim()) return messages;
    const q = query.toLowerCase();
    return messages.filter((m) => m.content.toLowerCase().includes(q));
  }, [query, messages]);

  // Append transcript to input
  useEffect(() => {
    if (transcript) {
      setUserInput((prev) => (prev + " " + transcript).trimStart());
    }
  }, [transcript]);

  // Speech Recognition toggle
  const handleSpeechRecognition = () => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser does not support speech recognition.");
      return;
    }
    try {
      if (!listening) {
        setIsRecording(true);
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        });
        toast.success("Listening...");
      } else {
        setIsRecording(false);
        SpeechRecognition.stopListening();
        resetTranscript();
        toast.success("Stopped listening.");
      }
    } catch {
      toast.error("Failed to start speech recognition.");
      setIsRecording(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  };

  // Auto-resize + length cap
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const next = textarea.value.slice(0, 2000);
    setUserInput(next);

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  // Realtime clock for timestamps display
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Send message to backend
  const PromptInput = async () => {
    const userPrompt = userInput.trim();
    if (!userPrompt || loading) return;

    const userMessage: ChatbotMessageProps = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);
    if (inputRef.current) inputRef.current.style.height = "auto";

    const history = [...messages, userMessage];

    try {
      const response = await SendChat(
        history.map(({ role, content }) => ({ role, content }))
      );

      const CaffBotResponse: ChatbotMessageProps = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => {
        const next = [...prev, CaffBotResponse];
        return next.length > 100 ? next.slice(-100) : next;
      });
      resetTranscript();
    } catch {
      toast.error("Failed to get response from CaffBot.");
    } finally {
      setLoading(false);
      setTimeout(scrollToBottom, 150);
    }
  };

  // Keyboard shortcut (Enter = send, Shift+Enter = newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      PromptInput();
    }
  };

  // Reactions
  const handleReaction = (messageId: string, emoji: string) => {
    setReactions((prev) => {
      const currentReactions = prev[messageId] || [];
      return currentReactions.includes(emoji)
        ? { ...prev, [messageId]: currentReactions.filter((r) => r !== emoji) }
        : { ...prev, [messageId]: [...currentReactions, emoji] };
    });
  };

  // Clear chat history (with confirmation)
  const ClearChat = () => {
    const userMessage = messages.filter((m) => m.role === "user");
    if (userMessage.length === 0) {
      toast.error("No user messages to clear.");
      return;
    }
    openModal({
      title: "Clear Chat History",
      message:
        "Are you sure you want to clear the chat history? this action cannot be undone",
      type: "danger",
      confirmText: "Clear",
      cancelText: "Cancel",
      onConfirm: () => {
        setMessages([
          {
            role: "assistant",
            content:
              "Hello! I'm CaffBot, your personal assistant. How can I help you today?",
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
          },
        ]);
        setReactions({});
        localStorage.removeItem("caffbot-messages");
        toast.success("Chat history cleared.");
        closeModal();
      },
    });
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(scrollToBottom, 100);
  }, [messages.length, scrollToBottom]);

  return (
    <div className="fixed right-4 bottom-24 sm:bottom-10 md:bottom-14 z-50">
      {modalProps && (
        <ModalConfirmation
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title={modalProps.title}
          message={modalProps.message}
          confirmText={modalProps.confirmText}
          cancelText={modalProps.cancelText}
          type={modalProps.type}
          icon={
            modalProps.type === "danger" ? (
              <div className="p-2 rounded-full bg-red-100 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>
            ) : undefined
          }
        />
      )}

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="chat"
            initial={{ clipPath: "circle(0% at 95% 95%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 95% 95%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 95% 95%)", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0.0, 0.2, 1] }}
            className="w-[min(360px,90vw)] h-[min(560px,80vh)] md:w-[360px] md:h-[560px] bg-card text-foreground border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl supports-[backdrop-filter]:bg-card/90"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-border bg-gradient-to-br from-secondary/60 to-accent/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center font-bold">
                  CB
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold leading-tight">
                    CaffBot
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Brain Tumor Assistant
                  </p>
                </div>

                {/* Header actions */}
                <div className="flex gap-1">
                  <button
                    title="Clear chat"
                    onClick={ClearChat}
                    className="p-2 rounded-xl hover:bg-muted/70 focus:outline-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    title="Close chat"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-muted/70 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Search bar */}
              <div className="mt-3 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              <AnimatePresence initial={false}>
                {SearchMessage.map((msg, idx) => {
                  const isLastBot =
                    idx === SearchMessage.length - 1 &&
                    msg.role === "assistant" &&
                    !loading &&
                    SearchMessage.length > 1 &&
                    SearchMessage[SearchMessage.length - 2].role === "user";

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <ChatBubble
                        message={msg}
                        now={now}
                        isNew={isLastBot}
                        listEndRef={listEndRef}
                        onReaction={handleReaction}
                        reactions={reactions[msg.id ?? msg.createdAt] || []}
                      />
                    </motion.div>
                  );
                })}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] bg-muted text-foreground rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0.2,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0.4,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          CaffBot is typing...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={listEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background">
              <div className="flex items-center justify-center gap-2 relative">
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message or use voice"
                  disabled={loading}
                  rows={1}
                  className="w-full resize-none placeholder:text-muted-foreground/70 text-xs rounded-2xl bg-input/60 border border-input focus:ring-2 focus:ring-ring/40 focus:outline-none px-4 py-2 scrollbar-none"
                  style={{ maxHeight: "120px" }}
                />
                {userInput.length > 0 && (
                  <span className="absolute -bottom-1 right-3 translate-y-full text-[10px] text-muted-foreground">
                    {userInput.length}/2000
                  </span>
                )}

                {/* Voice Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSpeechRecognition}
                  title={isRecording ? "Stop recording" : "Start recording"}
                  className={`p-3 rounded-2xl border border-input hover:bg-accent/60 transition ${
                    isRecording
                      ? "bg-red-100 border-red-300 dark:bg-red-900/20"
                      : "bg-card"
                  }`}
                >
                  {isRecording ? (
                    <Mic className="h-5 w-5 text-red-600" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )}
                </motion.button>

                {/* Voice waveform animation */}
                {isRecording && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-primary rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Send Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={PromptInput}
                  disabled={loading || !userInput.trim()}
                  title="Send"
                  className="p-3 rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  <Send className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            title="Open chat"
            className="p-4 rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transition-transform"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
