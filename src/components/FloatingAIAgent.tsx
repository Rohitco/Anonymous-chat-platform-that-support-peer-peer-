import { Bot, X, Send, Volume2, VolumeX, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
    messages,
    onDelta,
    onDone,
    signal,
}: {
    messages: Msg[];
    onDelta: (t: string) => void;
    onDone: () => void;
    signal?: AbortSignal;
}) {
    const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages }),
        signal,
    });

    if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `HTTP ${resp.status}`);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let done = false;

    while (!done) {
        const { done: rd, value } = await reader.read();
        if (rd) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
            let line = buf.slice(0, idx);
            buf = buf.slice(idx + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;
            const json = line.slice(6).trim();
            if (json === "[DONE]") { done = true; break; }
            try {
                const parsed = JSON.parse(json);
                const c = parsed.choices?.[0]?.delta?.content;
                if (c) onDelta(c);
            } catch {
                buf = line + "\n" + buf;
                break;
            }
        }
    }
    onDone();
}

function speakText(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[#*_`~>\-\[\]()]/g, "").replace(/\n+/g, ". ");
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 1;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith("en") && v.name.includes("Female")) || voices.find(v => v.lang.startsWith("en"));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
}

export function FloatingAIAgent() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [voiceOn, setVoiceOn] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const abortRef = useRef<AbortController | null>(null);
    const location = useLocation();

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        window.speechSynthesis?.getVoices();
    }, []);

    const send = useCallback(async () => {
        const text = input.trim();
        if (!text || isLoading) return;
        setInput("");

        const userMsg: Msg = { role: "user", content: text };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        let assistantSoFar = "";
        const ac = new AbortController();
        abortRef.current = ac;

        const upsert = (chunk: string) => {
            assistantSoFar += chunk;
            setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                    return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
            });
        };

        try {
            await streamChat({
                messages: [...messages, userMsg],
                onDelta: upsert,
                onDone: () => {
                    setIsLoading(false);
                    if (voiceOn && assistantSoFar) speakText(assistantSoFar);
                },
                signal: ac.signal,
            });
        } catch (e: any) {
            if (e.name !== "AbortError") {
                upsert("\n\n⚠️ " + (e.message || "Something went wrong."));
            }
            setIsLoading(false);
        }
    }, [input, isLoading, messages, voiceOn]);

    const toggleVoice = () => {
        if (voiceOn) window.speechSynthesis?.cancel();
        setVoiceOn(!voiceOn);
    };

    if (location.pathname === "/ai-chat") return null;

    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3">
            {open && (
                <div className="glass rounded-2xl w-80 sm:w-96 flex flex-col animate-slide-up" style={{ maxHeight: "70vh" }}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <span className="font-display font-bold text-sm text-foreground">MindSpace AI</span>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] text-muted-foreground">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={toggleVoice}>
                                {voiceOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setOpen(false)}>
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px]">
                        {messages.length === 0 && (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                    <Sparkles className="w-6 h-6 text-primary animate-pulse-soft" />
                                </div>
                                <p className="text-sm font-medium text-foreground">Hi there 💚</p>
                                <p className="text-xs text-muted-foreground mt-1">I'm here to listen. How are you feeling?</p>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${msg.role === "user"
                                        ? "message-self text-foreground rounded-br-md shadow-soft"
                                        : "glass-subtle text-foreground rounded-bl-md"
                                    }`}>
                                    {msg.role === "assistant" ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                            <div className="flex justify-start">
                                <div className="glass-subtle rounded-2xl rounded-bl-md px-3.5 py-2.5">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="px-3 py-2.5 border-t border-border/30">
                        <form
                            onSubmit={(e) => { e.preventDefault(); send(); }}
                            className="flex items-center gap-2"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-muted/50 rounded-xl px-4 py-2.5 text-sm outline-none text-foreground placeholder:text-muted-foreground focus:bg-muted transition-colors"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-9 w-9 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
                                disabled={!input.trim() || isLoading}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-glow flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 animate-glow-pulse"
                aria-label="AI Companion"
            >
                {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </button>
        </div>
    );
}
