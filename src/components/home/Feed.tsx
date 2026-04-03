import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
    id: number;
    author: string;
    avatar: string;
    timeAgo: string;
    content: string;
    emoji: string;
    likes: number;
    comments: { author: string; text: string }[];
    liked: boolean;
    saved: boolean;
}

const initialPosts: Post[] = [
    {
        id: 1,
        author: "Gentle Cloud",
        avatar: "☁️",
        timeAgo: "2h",
        content: "Today I took a 20-minute walk without my phone. It felt like the first time I really breathed in weeks. Small steps 🌿",
        emoji: "🚶",
        likes: 24,
        comments: [
            { author: "Calm River", text: "So proud of you! 💙" },
            { author: "Kind Leaf", text: "That takes real courage" },
        ],
        liked: false,
        saved: false,
    },
    {
        id: 2,
        author: "Warm Sun",
        avatar: "☀️",
        timeAgo: "5h",
        content: "Reminder: You don't have to have it all figured out. Healing isn't linear. Be gentle with yourself today ❤️",
        emoji: "💭",
        likes: 89,
        comments: [
            { author: "Soft Moon", text: "Needed this today, thank you 🙏" },
        ],
        liked: true,
        saved: false,
    },
    {
        id: 3,
        author: "Brave Star",
        avatar: "⭐",
        timeAgo: "8h",
        content: "Day 30 of meditation! Never thought I'd make it this far. If I can do it, you can too ✨",
        emoji: "🧘",
        likes: 156,
        comments: [
            { author: "Peace Dove", text: "Amazing streak!! 🔥" },
            { author: "Gentle Cloud", text: "Inspiring! What app do you use?" },
            { author: "Brave Star", text: "Just a simple timer honestly" },
        ],
        liked: false,
        saved: true,
    },
    {
        id: 4,
        author: "Peace Dove",
        avatar: "🕊️",
        timeAgo: "1d",
        content: "Journaling prompt that helped me today: 'What would I tell my younger self about this moment?' 📝",
        emoji: "✍️",
        likes: 67,
        comments: [],
        liked: false,
        saved: false,
    },
];

export function Feed() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
    const [newComment, setNewComment] = useState<Record<number, string>>({});

    const toggleLike = (postId: number) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                    : p
            )
        );
    };

    const toggleSave = (postId: number) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === postId ? { ...p, saved: !p.saved } : p))
        );
    };

    const toggleComments = (postId: number) => {
        setExpandedComments((prev) => {
            const next = new Set(prev);
            next.has(postId) ? next.delete(postId) : next.add(postId);
            return next;
        });
    };

    const addComment = (postId: number) => {
        const text = newComment[postId]?.trim();
        if (!text) return;
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? { ...p, comments: [...p.comments, { author: "You", text }] }
                    : p
            )
        );
        setNewComment((prev) => ({ ...prev, [postId]: "" }));
    };

    return (
        <section className="py-6">
            <div className="container mx-auto px-4 max-w-lg space-y-4">
                {posts.map((post) => (
                    <article key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                                    {post.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{post.author}</p>
                                    <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Content card */}
                        <div className="mx-4 mb-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-calm-blue/10 flex items-center justify-center min-h-[160px]">
                            <div className="text-center">
                                <span className="text-4xl mb-3 block">{post.emoji}</span>
                                <p className="text-foreground font-medium leading-relaxed">{post.content}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between px-4 pb-1">
                            <div className="flex items-center gap-3">
                                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 group">
                                    <Heart
                                        className={`w-6 h-6 transition-all ${post.liked
                                            ? "fill-red-500 text-red-500 scale-110"
                                            : "text-foreground group-hover:text-red-400"
                                            }`}
                                    />
                                </button>
                                <button onClick={() => toggleComments(post.id)}>
                                    <MessageCircle className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
                                </button>
                                <button>
                                    <Send className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                                </button>
                            </div>
                            <button onClick={() => toggleSave(post.id)}>
                                <Bookmark
                                    className={`w-6 h-6 transition-all ${post.saved ? "fill-foreground text-foreground" : "text-foreground hover:text-primary"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Likes */}
                        <div className="px-4 pb-2">
                            <p className="text-sm font-semibold text-foreground">{post.likes.toLocaleString()} likes</p>
                        </div>

                        {/* Comments */}
                        {post.comments.length > 0 && (
                            <div className="px-4 pb-2">
                                {!expandedComments.has(post.id) && post.comments.length > 1 && (
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className="text-sm text-muted-foreground mb-1"
                                    >
                                        View all {post.comments.length} comments
                                    </button>
                                )}
                                {(expandedComments.has(post.id) ? post.comments : post.comments.slice(0, 1)).map(
                                    (c, i) => (
                                        <p key={i} className="text-sm mb-0.5">
                                            <span className="font-semibold text-foreground">{c.author}</span>{" "}
                                            <span className="text-foreground/80">{c.text}</span>
                                        </p>
                                    )
                                )}
                            </div>
                        )}

                        {/* Add comment */}
                        <div className="flex items-center gap-2 px-4 pb-3 pt-1 border-t border-border/50">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={newComment[post.id] || ""}
                                onChange={(e) => setNewComment((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                                className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
                            />
                            {newComment[post.id]?.trim() && (
                                <button
                                    onClick={() => addComment(post.id)}
                                    className="text-sm font-semibold text-primary"
                                >
                                    Post
                                </button>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
