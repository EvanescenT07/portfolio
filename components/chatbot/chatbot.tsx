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
import { MessageBubble } from "@/components/chatbot/chat-bubble";
import { ModalConfirmation } from "@/components/ui/confirmation";
import {
  MessageCircle,
  Mic,
  MicOff,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<ChatbotMessageProps[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [now, setNow] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [reactions, setReactions] = useState<{ [messageId: string]: string[] }>(
    {}
  );
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en-US" | "id-ID">(
    "en-US"
  );

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const listEndRef = useRef<HTMLDivElement | null>(null);

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

  const quickReplies = [
    "Tell me about Fikar",
    "What can you do?",
    "How to contact Fikar?",
  ];

  // Load messages from localStorage on mount and ensure all have IDs
  useEffect(() => {
    const savedMessages = localStorage.getItem("caffbot-messages");
    if (savedMessages) {
      try {
        const parsed: ChatbotMessageProps[] = JSON.parse(savedMessages);
        const withIds = parsed.map((m) =>
          m.id ? m : { ...m, id: crypto.randomUUID() }
        );
        setMessage(withIds);
        localStorage.setItem("caffbot-messages", JSON.stringify(withIds));
      } catch {
        const initialMsg = {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content:
            "Hi! I'm Caffbot, your personal assistant. How can I help you today?",
          createdAt: new Date().toISOString(),
        };
        setMessage([initialMsg]);
        localStorage.removeItem("caffbot-messages");
      }
    } else {
      const initialMsg = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content:
          "Hi! I'm Caffbot, your personal assistant. How can I help you today?",
        createdAt: new Date().toISOString(),
      };
      setMessage([initialMsg]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (message.length > 0) {
      localStorage.setItem("caffbot-messages", JSON.stringify(message));
    }
  }, [message]);

  // Filtered messages based on search query
  const SearchMessage = useMemo(() => {
    if (!searchQuery) return message;
    return message.filter((msg) =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [message, searchQuery]);

  // Update user input from transcript
  useEffect(() => {
    if (transcript) {
      setUserInput((prev) => (prev ? prev + " " : "") + transcript);
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
          language: selectedLanguage,
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

  // Language selection
  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === "en-US" ? "id-ID" : "en-US";
    setSelectedLanguage(newLanguage);
    if (listening) {
      SpeechRecognition.stopListening();
      setTimeout(() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: newLanguage,
        });
      }, 100);
    }

    toast.success(
      `Language switched to ${
        newLanguage === "en-US" ? "English" : "Indonesian"
      }`
    );
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setUserInput(textarea.value);

    // Auto-resize
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  // Realtime clock for timestamps display
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  // User Prompt submission
  const handleUserPromptSubmission = async () => {
    const userPrompt = userInput.trim();
    if (!userPrompt || isLoading) return;

    const userMessage: ChatbotMessageProps = {
      id: crypto.randomUUID(),
      role: "user",
      content: userPrompt,
      createdAt: new Date().toISOString(),
    };

    // --- HIGHLIGHT START ---
    // Create the new messages array *before* updating the state.
    const newMessages = [...message, userMessage];

    // Optimistically update the UI with the new array.
    setMessage(newMessages);
    setUserInput("");
    setIsLoading(true);
    // --- HIGHLIGHT END ---

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      // --- HIGHLIGHT START ---
      // Send the consistent, updated history to the API.
      const response = await SendChat(
        newMessages.map(({ role, content }) => ({
          role,
          content,
        }))
      );
      // --- HIGHLIGHT END ---
      const botResponse: ChatbotMessageProps = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        createdAt: new Date().toISOString(),
      };

      // --- HIGHLIGHT START ---
      // Use a functional update to add the bot's response safely.
      setMessage((prev) => [...prev, botResponse]);
      // --- HIGHLIGHT END ---
      resetTranscript();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response from the server.");
      setMessage((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, I'm having trouble responding right now. Please try again later.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsRecording(false);
    }
  };

  // Enter key handler
  const onEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUserPromptSubmission();
    }
  };

  // Reaction handler
  const handleReaction = (messageId: string, emoji: string) => {
    setReactions((prev) => {
      const currentReactions = prev[messageId] || [];
      return currentReactions.includes(emoji)
        ? { ...prev, [messageId]: currentReactions.filter((r) => r !== emoji) }
        : { ...prev, [messageId]: [...currentReactions, emoji] };
    });
  };

  // Clear chat
  const clearChat = () => {
    const userMessages = message.filter((msg) => msg.role === "user");
    if (userMessages.length === 0) {
      toast.error("No messages to clear! Start a conversation first.");
      return;
    }
    openModal({
      title: "Clear Chat History",
      message:
        "Are you sure to want to clear all messages? this action cannot be undone.",
      confirmText: "Clear All",
      cancelText: "Cancel",
      type: "danger",
      onConfirm: () => {
        setMessage([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Hi! I'm Caffbot, your personal assistant. How can I help you today?",
            createdAt: new Date().toISOString(),
          },
        ]);
        setReactions({});
        localStorage.removeItem("caffbot-messages");
        toast.success("Chat cleared! Ready for a fresh start.");
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
    setTimeout(scrollToBottom, 500);
  }, [message.length, scrollToBottom]);

  return (
    <div className="fixed lg:right-12 right-6 bottom-24 sm:bottom-10 md:bottom-10 z-50">
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
            className="w-[min(360px,90vw)] h-[min(460px,80vh)] md:w-[360px] md:h-[460px] bg-card text-foreground border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl supports-[backdrop-filter]:bg-card/90"
          >
            {/* Header */}
            <div className="relative p-4 border-b border-foreground/10">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-foreground/10 text-sidebar-primary-foreground grid place-items-center font-bold font-work-sans">
                  CB
                </div>
                <div className="flex-1 ">
                  <h2 className="text-base font-semibold leading-tight font-comfortaa">
                    CaffBot
                  </h2>
                  <p className="text-xs text-foreground/70 font-work-sans">
                    Your personal AI assistant
                  </p>
                </div>
                {/* Action Button */}
                <div className="flex gap-1 rounded-xl bg-foreground/20">
                  <button
                    title="Clear Chat"
                    onClick={clearChat}
                    className="p-2 cursor-pointer rounded-xl hover:bg-foreground/10 "
                  >
                    <Trash2 className="h-5 w-5 text-foreground/70 group-hover:text-red-500 transition-colors" />
                  </button>
                  <button
                    title="Close Chat"
                    onClick={() => setIsOpen(false)}
                    className="p-2 cursor-pointer rounded-xl hover:bg-foreground/10"
                  >
                    <X className="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-foreground/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/10"
                />
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              <AnimatePresence initial={false}>
                {SearchMessage.map((msg, index) => {
                  const isLastBotMessage =
                    index === SearchMessage.length - 1 &&
                    msg.role === "assistant" &&
                    !isLoading &&
                    SearchMessage.length > 1 &&
                    SearchMessage[SearchMessage.length - 2].role === "user";

                  return (
                    <motion.div
                      key={msg.id ?? `${msg.createdAt}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.3,
                        delay: 0,
                        ease: "easeOut",
                      }}
                    >
                      <MessageBubble
                        message={msg}
                        now={now}
                        isNew={isLastBotMessage}
                        listEndRef={listEndRef}
                        onReaction={handleReaction}
                        reactions={reactions[msg.id ?? msg.createdAt] || []}
                      />
                    </motion.div>
                  );
                })}

                {/* Loading Indicator*/}
                {isLoading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] bg-foreground/5 text-foreground rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0.2,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-foreground/60 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: 0.4,
                            }}
                          />
                        </div>
                        <span className="text-xs text-foreground/70">
                          CaffBot is typing...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={listEndRef} />
            </div>

            {/* Quick Replies */}
            {!isLoading && userInput.length === 0 && (
              <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserInput(reply)}
                      className="text-xs bg-foreground/30 hover:bg-foreground/10 rounded-full px-3 py-2 whitespace-nowrap transition-colors"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            <div className="p-3 border-t border-foreground/10">
              <div className="flex items-center justify-center gap-2">
                <Textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={onEnter}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full resize-none placeholder:text-foreground/40 text-xs rounded-2xl border border-foreground/70 focus:ring-2 focus:ring-ring/10 focus:outline-none px-4 py-2 "
                />

                <div className="flex flex-col gap-2">
                  {/* Voice Button */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSpeechRecognition}
                    title={isRecording ? "Stop recording" : "Start recording"}
                    className={`p-3 rounded-2xl border border-foreground/40 hover:bg-accent/60 transition cursor-pointer ${
                      isRecording
                        ? "bg-red-100 border-red-300 dark:bg-red-900/20"
                        : "bg-foreground/1"
                    }`}
                  >
                    {isRecording ? (
                      <Mic className="h-4 w-4 text-red-600" />
                    ) : (
                      <MicOff className="h-4 w-4" />
                    )}
                  </motion.button>
                  {/* Language Switcher */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleLanguage}
                    title={`Switch to ${
                      selectedLanguage === "en-US" ? "Indonesian" : "English"
                    }`}
                    className="items-center p-3 rounded-2xl border border-foreground/40 hover:bg-accent/60 transition cursor-pointer text-xs font-medium"
                  >
                    {selectedLanguage === "en-US" ? "EN" : "ID"}
                  </motion.button>
                </div>

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
                  onClick={handleUserPromptSubmission}
                  disabled={isLoading || !userInput.trim()}
                  className="p-3 rounded-2xl border border-foreground/40 hover:bg-accent/60 transition cursor-pointer disabled:opacity-50"
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
            className="absolute bottom-0 right-0 p-4 rounded-full bg-sidebar-primary text-sidebar-primary-foreground shadow-lg transition-transform"
          >
            <MessageCircle className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
