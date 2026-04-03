import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { MessageCircle, Users, Search, Trash2, EyeOff, Eye, Clock, Filter } from "lucide-react";
import { Link } from "react-router-dom";

type ChatType = "ai" | "peer";
type ChatFilter = "all" | ChatType | "hidden";

interface ChatEntry {
    id: number;
    title: string;
    preview: string;
    date: string;
    type: ChatType;
    hidden: boolean;
}

const initialChats: ChatEntry[] = [
    { id: 1, title: "Feeling anxious today...", preview: "I've been feeling really overwhelmed with everything going on.", date: "Today, 2:30 PM", type: "ai", hidden: false },
    { id: 2, title: "Need someone to talk to", preview: "Hey, I just wanted to chat with someone who understands.", date: "Yesterday, 8:15 PM", type: "peer", hidden: false },
    { id: 3, title: "Coping with stress at work", preview: "Work has been really stressful lately and I need some strategies.", date: "2 days ago", type: "ai", hidden: false },
    { id: 4, title: "Work burnout discussion", preview: "I think I'm experiencing burnout. Can we talk about it?", date: "3 days ago", type: "peer", hidden: false },
    { id: 5, title: "Breathing exercises session", preview: "Can you guide me through some breathing exercises?", date: "Last week", type: "ai", hidden: false },
    { id: 6, title: "Relationship advice", preview: "I'm going through a tough time with my partner.", date: "Last week", type: "peer", hidden: false },
    { id: 7, title: "Sleep trouble tips", preview: "I haven't been sleeping well. Any suggestions?", date: "2 weeks ago", type: "ai", hidden: false },
    { id: 8, title: "Gratitude journaling", preview: "I want to start a gratitude practice.", date: "2 weeks ago", type: "ai", hidden: true },
];

const ChatHistory = () => {
    const [chats, setChats] = useState<ChatEntry[]>(initialChats);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<ChatFilter>("all");
    const [deleteTarget, setDeleteTarget] = useState<ChatEntry | null>(null);
    const [clearAllOpen, setClearAllOpen] = useState(false);

    const filteredChats = chats.filter((c) => {
        if ((filter as string) === "hidden") return c.hidden;
        if (filter !== "all" && c.type !== filter) return false;
        if (!c.hidden === false) return false;
        if (c.hidden) return false;
        if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.preview.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const toggleHide = (id: number) => {
        setChats((prev) => prev.map((c) => (c.id === id ? { ...c, hidden: !c.hidden } : c)));
    };

    const deleteChat = (id: number) => {
        setChats((prev) => prev.filter((c) => c.id !== id));
        setDeleteTarget(null);
    };

    const clearAll = () => {
        setChats([]);
        setClearAllOpen(false);
    };

    const filterButtons: { value: typeof filter; label: string }[] = [
        { value: "all", label: "All" },
        { value: "ai", label: "AI Chats" },
        { value: "peer", label: "Peer Chats" },
        { value: "hidden", label: "Hidden" },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-display font-bold text-foreground">Chat History</h1>
                    {chats.length > 0 && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive text-xs gap-1" onClick={() => setClearAllOpen(true)}>
                            <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </Button>
                    )}
                </div>

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-card border-border"
                    />
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-5 overflow-x-auto">
                    {filterButtons.map((f) => (
                        <Button
                            key={f.value}
                            variant={filter === f.value ? "default" : "outline"}
                            size="sm"
                            className="text-xs flex-shrink-0"
                            onClick={() => setFilter(f.value)}
                        >
                            {f.value === "hidden" && <EyeOff className="w-3 h-3 mr-1" />}
                            {f.value === "ai" && <MessageCircle className="w-3 h-3 mr-1" />}
                            {f.value === "peer" && <Users className="w-3 h-3 mr-1" />}
                            {f.value === "all" && <Filter className="w-3 h-3 mr-1" />}
                            {f.label}
                        </Button>
                    ))}
                </div>

                {/* Chat List */}
                {filteredChats.length === 0 ? (
                    <div className="text-center py-16">
                        <Clock className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">
                            {search ? "No conversations found" : filter === "hidden" ? "No hidden conversations" : "No chat history yet"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filteredChats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`group bg-card rounded-xl border border-border p-4 transition-all hover:shadow-soft ${chat.hidden ? "opacity-60" : ""}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${chat.type === "ai" ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"
                                        }`}>
                                        {chat.type === "ai" ? <MessageCircle className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-foreground truncate">{chat.title}</h3>
                                            <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.date}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{chat.preview}</p>
                                        <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={chat.type === "ai" ? "/ai-chat" : "/peer-chat"}>
                                                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-primary">
                                                    Continue
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost" size="sm"
                                                className="h-7 text-xs gap-1 text-muted-foreground"
                                                onClick={() => toggleHide(chat.id)}
                                            >
                                                {chat.hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                {chat.hidden ? "Show" : "Hide"}
                                            </Button>
                                            <Button
                                                variant="ghost" size="sm"
                                                className="h-7 text-xs gap-1 text-destructive hover:text-destructive"
                                                onClick={() => setDeleteTarget(chat)}
                                            >
                                                <Trash2 className="w-3 h-3" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <BottomNav />

            {/* Delete single chat */}
            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Conversation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deleteTarget?.title}"? This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="destructive" onClick={() => deleteTarget && deleteChat(deleteTarget.id)}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Clear all */}
            <Dialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Clear All History</DialogTitle>
                        <DialogDescription>This will permanently delete all your chat history. This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="destructive" onClick={clearAll}>Clear All</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChatHistory;
