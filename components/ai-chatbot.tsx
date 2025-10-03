"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { EXAMPLE_PROMPTS } from "@/lib/gemini-service";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import SparklesIcon from "@/components/sparkles-icon";
import SparkleIcon from "@/components/sparkle-icon";
import { DobeeAi } from "@/components/dobee-ai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatbotProps {
  braceletSize: number;
  onDesignGenerated: (design: {
    beadSelections: { [key: number]: string };
    explanation: string;
  }) => void;
}

export default function AIChatbot({
  braceletSize,
  onDesignGenerated,
}: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ask me anything!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLatestDesign, setHasLatestDesign] = useState(false);
  const [hasUserSent, setHasUserSent] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Mark that user has sent their first message (hide crystal ball)
    setHasUserSent(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          braceletSize,
        }),
      });

      const data = await response.json();

      if (data.success && data.design) {
        // Add AI response
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `✨ I've created a design for you!\n\n${data.design.explanation}\n\nClick "Apply Design" to use this bracelet design.`,
          },
        ]);

        // Store the design for application (client-side only)
        if (typeof window !== "undefined") {
          sessionStorage.setItem("latestAIDesign", JSON.stringify(data.design));
          setHasLatestDesign(true);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `❌ Sorry, I couldn't generate a design: ${
              data.error || "Unknown error"
            }`,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Oops! Something went wrong. Please try again or check your API key configuration.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyDesign = () => {
    if (typeof window === "undefined") return;
    const designStr = sessionStorage.getItem("latestAIDesign");
    if (designStr) {
      const design = JSON.parse(designStr);
      onDesignGenerated(design);
      setIsOpen(false);
      sessionStorage.removeItem("latestAIDesign");
      setHasLatestDesign(false);
    }
  };

  // Check for latest design on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasLatestDesign(sessionStorage.getItem("latestAIDesign") !== null);
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 z-50 p-5 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          aria-label="Open AI Designer"
        >
          <SparklesIcon className="w-20 h-20" />
        </Button>
      )}

      {/* Backdrop/Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-[#eeeeee] rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className=" text-[#323232] py-3 px-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-[#6EA6BF]" />
              <h3 className="font-medium text-sm">AI Designer</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="border-transparent hover:border-gray-300 bg-transparent hover:bg-gray-100 rounded-full p-2 transition-colors"
            >
              <X className="w-4 h-4 text-[#727272]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* DobeeAi Crystal Ball - Show only before user sends first message */}
            {!hasUserSent && (
              <div
                className={`flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${
                  hasUserSent ? "opacity-0" : "opacity-100"
                }`}
              >
                <DobeeAi />
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-b from-[#8AB5D5] to-[#6EA6BF] text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-[12px] whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Apply Design Button */}
          {hasLatestDesign && !isLoading && (
            <div className="absolute w-full bottom-25 px-4">
              <Button
                onClick={handleApplyDesign}
                size="lg"
                variant="default"
                className="w-full"
              >
                Apply to Bracelet
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="pb-2 px-2">
            <div className="flex gap-2 bg-white shadow-sm rounded-t-lg">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Describe your vibe..."
                disabled={isLoading}
                className="flex-1 px-3 py-3 text-[12px] focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-4"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5 text-[#727272] " />
                )}
              </button>
            </div>
            {/* Sample Prompts Combobox */}
            <div>
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <button className="flex flex-row w-full gap-1.5 bg-[#f7f7f7] hover:bg-gray-200 shadow-sm rounded-b-lg items-center justify-between px-3 py-2.5 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <SparkleIcon className="w-3.5 h-3.5 text-[#6EA6BF]" />
                      <span className="text-xs text-gray-700">
                        Sample Prompts
                      </span>
                    </div>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search prompts..." />
                    <CommandList>
                      <CommandEmpty>No prompts found.</CommandEmpty>
                      <CommandGroup heading="Sample Prompts">
                        {EXAMPLE_PROMPTS.map((example, index) => (
                          <CommandItem
                            key={index}
                            value={example}
                            onSelect={() => {
                              setInputValue(example);
                              setOpenCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                inputValue === example
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {example}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
