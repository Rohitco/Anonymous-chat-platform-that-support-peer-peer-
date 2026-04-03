import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    MessageCircle, Users, Shield, Archive, Lock, Mail,
    ChevronRight, Bot, UserPlus, Filter
} from "lucide-react";

type ChatFilter = "all" | "unread" | "archived" | "locked";

const recentChats = [
    { id: 1, title: "Feeling anxious today...", preview: "I've been feeling really overwhelmed...", date: "Today", type: "ai" as const, unread: 0, archived: false, locked: false },
    { id: 2, title: "Need someone to talk to", preview: "Hey, I just wanted to chat...", date: "Yesterday", type: "peer" as const, unread: 3, archived: false, locked: false },
    { id: 3, title: "Coping with stress at work", preview: "Work has been really stressful...", date: "2 days ago", type: "ai" as const, unread: 0, archived: false, locked: true },
    { id: 4, title: "Work burnout discussion", preview: "I think I'm experiencing burnout...", date: "3 days ago", type: "peer" as const, unread: 1, archived: false, locked: false },
    { id: 5, title: "Breathing exercises session", preview: "Can you guide me through some...", date: "Last week", type: "ai" as const, unread: 0, archived: true, locked: false },
    { id: 6, title: "Relationship advice", preview: "I'm going through a tough time...", date: "Last week", type: "peer" as const, unread: 0, archived: true, locked: false },
];

const StartChat = () => {
    const [activeFilter, setActiveFilter] = useState<ChatFilter>("all");
    const [chats, setChats] = useState(recentChats);

    const toggleArchive = (id: number) => {
        setChats(prev => prev.map(c => c.id === id ? { ...c, archived: !c.archived } : c));
    };

    const toggleLock = (id: number) => {
        setChats(prev => prev.map(c => c.id === id ? { ...c, locked: !c.locked } : c));
    };

    const markRead = (id: number) => {
        setChats(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    };

    const filtered = chats.filter(c => {
        if (activeFilter === "unread") return c.unread > 0;
        if (activeFilter === "archived") return c.archived;
        if (activeFilter === "locked") return c.locked;
        return !c.archived;
    });

    const filters: { value: ChatFilter; label: string; icon: React.ReactNode; count?: number }[] = [
        { value: "all", label: "All", icon: <Filter className="w-3.5 h-3.5" /> },
        { value: "unread", label: "Unread", icon: <Mail className="w-3.5 h-3.5" />, count: chats.filter(c => c.unread > 0).length },
        { value: "archived", label: "Archived", icon: <Archive className="w-3.5 h-3.5" />, count: chats.filter(c => c.archived).length },
        { value: "locked", label: "Locked", icon: <Lock className="w-3.5 h-3.5" />, count: chats.filter(c => c.locked).length },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                <h1 className="text-2xl font-display font-bold text-foreground mb-5">Start a Chat</h1>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link to="/ai-chat" className="group">
                        <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/40 hover:shadow-soft transition-all">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">AI Chat</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Talk to your AI companion</p>
                        </div>
                    </Link>
                    <Link to="/peer-chat" className="group">
                        <div className="bg-card border border-border rounded-2xl p-4 hover:border-accent/40 hover:shadow-soft transition-all">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                                <UserPlus className="w-5 h-5 text-accent-foreground" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Peer Chat</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Connect with someone who cares</p>
                        </div>
                    </Link>
                    <Link to="/private-room" className="group">
                        <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/40 hover:shadow-soft transition-all">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Private Room</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Anonymous & encrypted</p>
                        </div>
                    </Link>
                    <Link to="/messages" className="group">
                        <div className="bg-card border border-border rounded-2xl p-4 hover:border-accent/40 hover:shadow-soft transition-all">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                                <MessageCircle className="w-5 h-5 text-accent-foreground" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground">Messages</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Direct peer conversations</p>
                        </div>
                    </Link>
                </div>

                {/* Snapchat-style Filters */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {filters.map(f => (
                        <button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === f.value
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                }`}
                        >
                            {f.icon}
                            {f.label}
                            {f.count !== undefined && f.count > 0 && (
                                <span className={`ml-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${activeFilter === f.value ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                                    }`}>
                                    {f.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Recent Chats */}
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {activeFilter === "all" ? "Recent Conversations" : activeFilter === "unread" ? "Unread Messages" : activeFilter === "archived" ? "Archived Chats" : "Locked Chats"}
                </h2>

                {filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-sm">No conversations here</p>
                    </div>
                ) : (
                    <div className="space-y-1.5">
                        {filtered.map(chat => (
                            <div key={chat.id} className="group flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:shadow-soft transition-all">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${chat.type === "ai" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent-foreground"
                                    }`}>
                                    {chat.type === "ai" ? <Bot className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                </div>

                                <Link to={chat.type === "ai" ? "/ai-chat" : "/peer-chat"} className="flex-1 min-w-0" onClick={() => markRead(chat.id)}>
                                    <div className="flex items-center gap-2">
                                        <h3 className={`text-sm truncate ${chat.unread > 0 ? "font-bold text-foreground" : "font-medium text-foreground"}`}>
                                            {chat.title}
                                        </h3>
                                        {chat.locked && <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />}
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.preview}</p>
                                </Link>

                                <div className="flex items-center gap-1 flex-shrink-0">
                                    {chat.unread > 0 && (
                                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                                            {chat.unread}
                                        </span>
                                    )}
                                    <div className="hidden group-hover:flex items-center gap-0.5">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleArchive(chat.id)} title={chat.archived ? "Unarchive" : "Archive"}>
                                            <Archive className="w-3.5 h-3.5 text-muted-foreground" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleLock(chat.id)} title={chat.locked ? "Unlock" : "Lock"}>
                                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                        </Button>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default StartChat;
