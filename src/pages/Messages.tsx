import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const conversations = [
    { id: "1", name: "Calm_Soul", emoji: "🌸", lastMessage: "Thank you for sharing 💛", time: "2m", unread: 2 },
    { id: "2", name: "HopeWalker", emoji: "🌻", lastMessage: "That meditation tip really helped!", time: "15m", unread: 0 },
    { id: "3", name: "StarGazer", emoji: "⭐", lastMessage: "How are you feeling today?", time: "1h", unread: 1 },
    { id: "4", name: "Gentle_Rain", emoji: "🌧️", lastMessage: "I tried journaling today", time: "3h", unread: 0 },
    { id: "5", name: "SunriseSeeker", emoji: "🌅", lastMessage: "You're not alone in this", time: "1d", unread: 0 },
];

const Messages = () => {
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [messages, setMessages] = useState<Record<string, Message[]>>({
        "1": [
            { id: "1", content: "Hey, I read your story about managing anxiety. It really resonated with me.", role: "peer", timestamp: new Date(Date.now() - 300000), senderName: "Calm_Soul" },
            { id: "2", content: "Thank you! It means a lot to know it helped someone.", role: "user", timestamp: new Date(Date.now() - 240000) },
            { id: "3", content: "Thank you for sharing 💛", role: "peer", timestamp: new Date(Date.now() - 120000), senderName: "Calm_Soul" },
        ],
    });

    const activePeer = conversations.find((c) => c.id === activeChat);
    const filtered = conversations.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    const handleSend = (text: string) => {
        if (!activeChat) return;
        const newMsg: Message = { id: Date.now().toString(), content: text, role: "user", timestamp: new Date() };
        setMessages((prev) => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMsg] }));
    };

    if (activeChat && activePeer) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)}><ArrowLeft className="w-5 h-5" /></Button>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">{activePeer.emoji}</div>
                    <div><p className="font-semibold text-foreground text-sm">{activePeer.name}</p><p className="text-xs text-muted-foreground">Anonymous</p></div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {(messages[activeChat] || []).map((msg) => (<ChatMessage key={msg.id} message={msg} />))}
                </div>
                <ChatInput onSend={handleSend} placeholder="Send an anonymous message..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                <h1 className="text-2xl font-display font-bold text-foreground mb-4">Messages</h1>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations..." className="pl-10" />
                </div>
                <div className="space-y-1">
                    {filtered.map((conv) => (
                        <button key={conv.id} onClick={() => setActiveChat(conv.id)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl shrink-0">{conv.emoji}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-foreground text-sm">{conv.name}</p>
                                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread > 0 && <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{conv.unread}</div>}
                        </button>
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default Messages;
