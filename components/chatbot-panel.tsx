"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  X,
  Send,
  ExternalLink,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Array<{
    title: string;
    url: string;
  }>;
  isLoading?: boolean;
}

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your news assistant. Ask me anything about current events or news topics.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle tooltip visibility at regular intervals
  useEffect(() => {
    if (!isOpen) {
      // Show tooltip immediately
      setShowTooltip(true);

      // Then toggle at intervals
      const interval = setInterval(() => {
        setShowTooltip((prev) => !prev);
      }, 8000);

      return () => clearInterval(interval);
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    // Add loading message from assistant
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      isLoading: true,
    };

    setMessages([...messages, userMessage, loadingMessage]);
    setInput("");

    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages((prev) => {
        const newMessages = [...prev];
        const loadingIndex = newMessages.findIndex((m) => m.isLoading);

        if (loadingIndex !== -1) {
          // Replace loading message with actual response
          newMessages[loadingIndex] = {
            id: Date.now().toString(),
            role: "assistant",
            content: getSimulatedResponse(input),
            citations: [
              {
                title: "CNN: Market Report - April 2025",
                url: "#",
              },
              {
                title: "Financial Times: Tech Stocks Analysis",
                url: "#",
              },
            ],
          };
        }

        return newMessages;
      });
    }, 2000);
  };

  // Simple response simulation
  const getSimulatedResponse = (query: string): string => {
    if (
      query.toLowerCase().includes("stock") ||
      query.toLowerCase().includes("market")
    ) {
      return "The stock market showed mixed results today. Technology stocks continued their upward trend with major companies like Apple and Microsoft gaining around 2%. However, energy and utility sectors saw modest declines due to regulatory concerns. Trading volume was average, suggesting cautious investor sentiment ahead of tomorrow's Federal Reserve announcement.";
    }

    if (
      query.toLowerCase().includes("spacex") ||
      query.toLowerCase().includes("starship")
    ) {
      return "SpaceX's recent Starship test was successful, with the vehicle reaching orbit for the first time. This marks a significant milestone in the company's Mars mission plans. The Super Heavy booster performed as expected and made a controlled landing. Engineers are now analyzing flight data to prepare for future launches.";
    }

    return "I found several recent news articles about this topic. The most relevant information indicates that this is an evolving story with developments happening quickly. Experts are still analyzing the implications, but initial reports suggest significant impact in the relevant sector.";
  };

  return (
    <>
      {/* Floating chat button with left-side popout tooltip */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="mr-2 px-5 py-3 bg-background border border-border/60 text-foreground shadow-sm rounded-xl text-lg font-semibold"
            >
              <span className="flex items-center">
                Ask me anything related to the news!{" "}
                <ArrowRight className="h-5 w-5 ml-2 animate-pulse" />
              </span>
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-background border-t border-r border-border/60 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: isOpen ? 180 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            scale: {
              repeat: !isOpen ? Infinity : 0,
              repeatType: "reverse",
              duration: 2,
            },
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "rounded-full h-14 w-14 shadow-lg transition-colors duration-200",
              isOpen
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            size="icon"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageSquare className="h-6 w-6" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Chat panel */}
      <motion.div
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background border-l z-50 flex flex-col"
        )}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
      >
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="font-semibold">News Assistant</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-xl p-4",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                )}
              >
                {message.isLoading ? (
                  <div className="flex items-center justify-center h-8">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm">{message.content}</p>

                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-primary-foreground/20 text-xs space-y-1">
                        <p className="font-medium">Sources:</p>
                        {message.citations.map((citation, index) => (
                          <a
                            key={index}
                            href={citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            {citation.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about the news..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <motion.div
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.1 }}
            >
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </>
  );
}
