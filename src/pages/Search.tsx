import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, TrendingUp, Heart, Brain, Moon, Smile, Users, Leaf, Dumbbell, BookOpen, Music, Palette, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
    { label: "Anxiety", emoji: "😰", icon: Brain, color: "from-primary/20 to-calm-blue/20", posts: 234 },
    { label: "Depression", emoji: "🌧️", icon: Moon, color: "from-calm-blue/20 to-primary/20", posts: 189 },
    { label: "Self-Care", emoji: "🧖", icon: Heart, color: "from-accent/20 to-primary/20", posts: 312 },
    { label: "Mindfulness", emoji: "🧘", icon: Leaf, color: "from-primary/20 to-accent/20", posts: 276 },
    { label: "Sleep", emoji: "🌙", icon: Moon, color: "from-calm-blue/30 to-primary/10", posts: 154 },
    { label: "Stress", emoji: "💆", icon: Coffee, color: "from-accent/20 to-calm-blue/20", posts: 201 },
    { label: "Relationships", emoji: "💞", icon: Users, color: "from-accent/20 to-primary/20", posts: 167 },
    { label: "Motivation", emoji: "💪", icon: Dumbbell, color: "from-primary/20 to-accent/20", posts: 198 },
    { label: "Journaling", emoji: "📝", icon: BookOpen, color: "from-calm-blue/20 to-accent/20", posts: 143 },
    { label: "Art Therapy", emoji: "🎨", icon: Palette, color: "from-accent/20 to-calm-blue/20", posts: 98 },
    { label: "Music Healing", emoji: "🎵", icon: Music, color: "from-primary/20 to-calm-blue/20", posts: 112 },
    { label: "Positivity", emoji: "☀️", icon: Smile, color: "from-accent/20 to-primary/20", posts: 256 },
];

const trending = [
    "breathing exercises", "morning routine", "gratitude journal", "cope with loneliness", "better sleep tips",
];

const recentSearches = [
    "meditation for beginners", "anxiety coping", "self-care ideas",
];

const Search = () => {
    const [query, setQuery] = useState("");

    const filtered = useMemo(
        () =>
            query.trim()
                ? categories.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
                : categories,
        [query]
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search topics, resources, stories..."
                        className="pl-10 h-12 rounded-xl bg-muted/50 border-border text-base"
                    />
                </div>

                {/* Trending & Recent — show when not searching */}
                {!query.trim() && (
                    <>
                        {/* Recent Searches */}
                        <section className="mb-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Recent</h3>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setQuery(t)}
                                        className="px-3 py-1.5 rounded-full bg-muted text-sm text-foreground hover:bg-muted/80 transition-colors"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Trending */}
                        <section className="mb-6">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> Trending
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {trending.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setQuery(t)}
                                        className="px-3 py-1.5 rounded-full bg-primary/10 text-sm text-primary hover:bg-primary/20 transition-colors"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {/* Category Grid */}
                <section>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                        {query.trim() ? `Results for "${query}"` : "Browse Topics"}
                    </h3>

                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <SearchIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
                            <p className="text-sm">No topics found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            {filtered.map((cat) => (
                                <Link
                                    to="/ai-chat"
                                    key={cat.label}
                                    className={`rounded-2xl bg-gradient-to-br ${cat.color} border border-border/50 p-4 flex flex-col gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer`}
                                >
                                    <span className="text-3xl">{cat.emoji}</span>
                                    <span className="font-semibold text-foreground text-sm">{cat.label}</span>
                                    <span className="text-xs text-muted-foreground">{cat.posts} posts</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <BottomNav />
        </div>
    );
};

export default Search;
