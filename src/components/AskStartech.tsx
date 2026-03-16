import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage } from "../types";
import AiIcon from "./AiIcon";

interface AskStartechProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "How can I help you learn about StarTech Innovation? I can answer questions about our services, technology, and implementation approach.",
  timestamp: Date.now(),
};

const QUICK_PROMPTS = [
  "What services do you offer?",
  "Tell me about your AI capabilities",
  "How does the 90-day process work?",
  "What industries do you serve?",
];

function hasSpeechRecognition(): boolean {
  const w = window as Window & {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export default function AskStartech({ isOpen, onClose }: AskStartechProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      audioRef.current?.pause();
      abortRef.current?.abort();
    };
  }, []);

  const playTts = useCallback(
    async (text: string, msgId: string) => {
      if (isMuted) return;

      // Strip markdown formatting for clean TTS
      const clean = text
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/_([^_]+)_/g, "$1")
        .replace(/#{1,6}\s*/g, "")
        .replace(/```[^`]*```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^[-*]\s+/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();

      if (!clean) return;

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: clean.slice(0, 500) }),
        });

        if (!res.ok) return;

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.volume = 1.0;
        audioRef.current = audio;
        setPlayingId(msgId);

        // Boost volume on mobile using Web Audio API
        try {
          const ctx = new AudioContext();
          const source = ctx.createMediaElementSource(audio);
          const gain = ctx.createGain();
          gain.gain.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 10.0 : 1.5;
          source.connect(gain);
          gain.connect(ctx.destination);
        } catch {
          // Fallback: play without boost
        }

        audio.onended = () => {
          setPlayingId(null);
          URL.revokeObjectURL(url);
        };
        audio.onerror = () => {
          setPlayingId(null);
          URL.revokeObjectURL(url);
        };

        await audio.play();
      } catch {
        setPlayingId(null);
      }
    },
    [isMuted]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setPlayingId(null);
      }

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setIsStreaming(true);

      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(
            (errData as { error?: string }).error ||
              "Failed to get a response."
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream.");

        const decoder = new TextDecoder();
        let buffer = "";
        let fullContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                fullContent += delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, content: fullContent }
                      : m
                  )
                );
              }
            } catch {
              // skip
            }
          }
        }

        if (fullContent) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: fullContent } : m
            )
          );
          // On desktop, auto-play TTS. On iOS/mobile, user must tap play
          if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            playTts(fullContent, assistantMsg.id);
          }
        } else {
          setMessages((prev) => prev.filter((m) => m.id !== assistantMsg.id));
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content:
                    err instanceof Error
                      ? `Sorry, ${err.message}`
                      : "Sorry, something went wrong.",
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming, playTts]
  );

  const startListening = useCallback(() => {
    if (!hasSpeechRecognition()) return;

    const w = window as Window & {
      SpeechRecognition?: new () => SpeechRecognition;
      webkitSpeechRecognition?: new () => SpeechRecognition;
    };
    const SpeechRec = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        sendMessage(transcript);
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    setIsListening(true);
    recognition.start();
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev && audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setPlayingId(null);
      }
      return !prev;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage]
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={onClose}
          style={{ animation: "fade-in 0.2s ease-out" }}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-st-bg md:inset-auto md:top-0 md:right-0 md:bottom-0 md:w-[420px] md:border-l md:border-st-border ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
        style={{
          transition:
            "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-st-border px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AiIcon className="h-4 w-4 text-st-accent" />
            <span className="text-sm font-medium text-white">
              Ask StarTech
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="flex h-11 w-11 items-center justify-center rounded-md text-st-text-muted transition-colors duration-300 hover:text-white"
            >
              {isMuted ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-11 w-11 items-center justify-center rounded-md text-st-text-muted transition-colors duration-300 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isPlaying={playingId === msg.id}
                onPlay={() => playTts(msg.content, msg.id)}
              />
            ))}
            {isStreaming &&
              messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="mt-6 space-y-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="block w-full min-h-[44px] rounded-lg border border-st-border px-3 py-2.5 text-left text-[13px] text-st-text-muted transition-colors hover:border-st-border-hover hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-st-border p-4">
          <div className="flex items-end gap-2">
            {/* Mic button */}
            {hasSpeechRecognition() && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                aria-label={isListening ? "Stop listening" : "Voice input"}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                  isListening
                    ? "border-st-accent/40 bg-st-accent/10 text-st-accent"
                    : "border-st-border text-st-text-muted hover:border-st-border-hover hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </button>
            )}
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening..." : "Ask about our services..."}
              rows={1}
              disabled={isListening}
              className="max-h-28 min-h-[44px] flex-1 resize-none rounded-lg border border-st-border bg-transparent px-3 py-2.5 text-sm text-white placeholder-st-text-muted/40 outline-none transition-colors focus:border-st-blue/40 disabled:opacity-40"
              style={{ lineHeight: "1.5" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-st-bg transition-opacity disabled:opacity-20"
              aria-label="Send message"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-st-text-muted/30">
            Powered by GPT-4o-mini
          </p>
        </form>
      </div>
    </>
  );
}

function MessageBubble({
  message,
  isPlaying,
  onPlay,
}: {
  message: ChatMessage;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{ animation: "slide-in-up 0.2s ease-out" }}
    >
      <div
        className={`group relative max-w-[85%] rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser ? "bg-white/[0.08] text-white" : "text-st-text-muted"
        }`}
      >
        {message.content.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
        {/* Play button for assistant messages */}
        {!isUser && message.content && (
          <div className="mt-1.5 flex items-center">
            <button
              onClick={onPlay}
              aria-label={isPlaying ? "Playing..." : "Play audio"}
              className={`flex h-7 min-h-[44px] min-w-[44px] items-center gap-1.5 rounded-md px-2 text-[10px] tracking-wide transition-colors duration-300 ${
                isPlaying
                  ? "text-st-gold-light"
                  : "text-st-text-muted hover:text-st-text"
              }`}
            >
              {isPlaying ? (
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
              {isPlaying ? "Playing" : "Listen"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1.5 px-3.5 py-2.5">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-st-text-muted/40" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-st-text-muted/40" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-st-text-muted/40" />
      </div>
    </div>
  );
}
