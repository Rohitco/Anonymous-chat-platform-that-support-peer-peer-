import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Lock, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { useToast } from "@/hooks/use-toast";

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const ANONYMOUS_NAMES = [
    "Silent Fox", "Hidden Owl", "Shadow Deer", "Mystic Wolf",
    "Secret Hawk", "Quiet Lynx", "Veiled Bear", "Ghost Hare",
];

export default function PrivateRoom() {
    const [phase, setPhase] = useState<"lobby" | "chat">("lobby");
    const [nickname, setNickname] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [myName] = useState(() => ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const displayName = nickname.trim() || myName;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleCreate = () => {
        const code = generateRoomCode();
        setRoomCode(code);
        setPhase("chat");
        setMessages([
            {
                id: "system",
                content: `🔒 Private room created! Share the code **${code}** with someone you trust. Only people with this code can join.`,
                role: "assistant",
                timestamp: new Date(),
            },
        ]);
    };

    const handleJoin = () => {
        if (!joinCode.trim()) {
            toast({ title: "Enter a room code", description: "Ask your friend for the room code to join.", variant: "destructive" });
            return;
        }
        setRoomCode(joinCode.trim().toUpperCase());
        setPhase("chat");
        setMessages([
            {
                id: "system",
                content: `🔒 You joined room **${joinCode.trim().toUpperCase()}**. This is a private, anonymous space.`,
                role: "assistant",
                timestamp: new Date(),
            },
            {
                id: "peer-welcome",
                content: "Hey! Glad you could join. How are you doing today? 💚",
                role: "peer",
                senderName: "Silent Fox",
                timestamp: new Date(),
            },
        ]);
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSend = (content: string) => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), content, role: "user", timestamp: new Date() },
        ]);

        // Simulated peer reply
        setTimeout(() => {
            const replies = [
                "That means a lot, thank you for sharing. 💛",
                "I hear you. You're safe here.",
                "Take your time — no pressure at all.",
                "I've felt that way too. You're not alone.",
            ];
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    content: replies[Math.floor(Math.random() * replies.length)],
                    role: "peer",
                    senderName: ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)],
                    timestamp: new Date(),
                },
            ]);
        }, 2000 + Math.random() * 2000);
    };

    // ---- LOBBY ----
    if (phase === "lobby") {
        return (
            <div className="min-h-screen bg-gradient-hero flex flex-col">
                <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
                    <div className="container mx-auto px-4 h-16 flex items-center gap-3">
                        <Link to="/">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="font-display font-semibold text-foreground">Private Room</h1>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-elevated p-8 space-y-6">
                        <div>
                            <h2 className="font-display text-2xl font-bold text-foreground">Private Room</h2>
                            <p className="text-muted-foreground text-sm mt-1">Create or join a private chat room</p>
                        </div>

                        <Input
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Your nickname (optional)"
                            className="rounded-xl"
                        />

                        <Button variant="hero" size="lg" className="w-full" onClick={handleCreate}>
                            Create New Room
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-muted-foreground font-medium">OR</span>
                            <div className="flex-1 h-px bg-border" />
                        </div>

                        <Input
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value)}
                            placeholder="Enter room code to join"
                            className="rounded-xl"
                        />

                        <Button variant="outline" size="lg" className="w-full" onClick={handleJoin}>
                            Join Room
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    // ---- CHAT ----
    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col">
            <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setPhase("lobby")}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-display font-semibold text-foreground text-sm">Private Room</h1>
                                <p className="text-xs text-muted-foreground">Code: {roomCode}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={handleCopyCode}>
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Code"}
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4">
                <div className="container mx-auto max-w-2xl">
                    <ChatInput onSend={handleSend} placeholder="Type a message..." />
                    <p className="text-center text-xs text-muted-foreground py-2">
                        Speaking as <span className="font-medium text-primary">{displayName}</span> • Room {roomCode}
                    </p>
                </div>
            </div>
        </div>
    );
}
