import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const stories = [
    { id: 1, name: "You", avatar: "🌿", hasStory: false, isOwn: true },
    { id: 2, name: "Gentle Cloud", avatar: "☁️", hasStory: true, color: "from-pink-400 to-purple-500" },
    { id: 3, name: "Calm River", avatar: "🌊", hasStory: true, color: "from-blue-400 to-cyan-500" },
    { id: 4, name: "Warm Sun", avatar: "☀️", hasStory: true, color: "from-yellow-400 to-orange-500" },
    { id: 5, name: "Kind Leaf", avatar: "🍃", hasStory: true, color: "from-green-400 to-emerald-500" },
    { id: 6, name: "Soft Moon", avatar: "🌙", hasStory: true, color: "from-indigo-400 to-violet-500" },
    { id: 7, name: "Brave Star", avatar: "⭐", hasStory: true, color: "from-amber-400 to-red-500" },
    { id: 8, name: "Peace Dove", avatar: "🕊️", hasStory: true, color: "from-teal-400 to-blue-500" },
];

const storyContents = [
    { text: "Today I practiced gratitude 🙏", bg: "from-purple-600 to-pink-500" },
    { text: "3 days of journaling streak! 📝", bg: "from-blue-600 to-cyan-500" },
    { text: "Feeling stronger every day 💪", bg: "from-orange-500 to-red-500" },
    { text: "Nature walk helped me reset 🌳", bg: "from-green-600 to-emerald-500" },
    { text: "Meditation: 10 min today 🧘", bg: "from-indigo-600 to-violet-500" },
    { text: "Grateful for this community ❤️", bg: "from-rose-500 to-pink-600" },
    { text: "Small wins matter ✨", bg: "from-amber-500 to-yellow-600" },
];

export function Stories() {
    const [viewingStory, setViewingStory] = useState<number | null>(null);
    const [storyProgress, setStoryProgress] = useState(0);

    const openStory = (id: number) => {
        if (id === 1) return; // own story
        setViewingStory(id);
        setStoryProgress(0);
        // Auto-progress
        const interval = setInterval(() => {
            setStoryProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setViewingStory(null);
                    return 0;
                }
                return prev + 2;
            });
        }, 80);
    };

    const currentStoryContent = viewingStory
        ? storyContents[(viewingStory - 2) % storyContents.length]
        : null;

    const currentStoryUser = viewingStory
        ? stories.find((s) => s.id === viewingStory)
        : null;

    return (
        <>
            <div className="w-full overflow-x-auto scrollbar-hide py-4">
                <div className="flex gap-4 px-4 min-w-max">
                    {stories.map((story) => (
                        <button
                            key={story.id}
                            onClick={() => openStory(story.id)}
                            className="flex flex-col items-center gap-1.5 min-w-[72px]"
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl relative ${story.hasStory
                                        ? `bg-gradient-to-br ${story.color} p-[2.5px]`
                                        : "bg-muted p-[2.5px]"
                                    }`}
                            >
                                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                                    <span className="text-xl">{story.avatar}</span>
                                </div>
                                {story.isOwn && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-card">
                                        +
                                    </div>
                                )}
                            </div>
                            <span className="text-xs text-muted-foreground truncate w-16 text-center">
                                {story.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Story Viewer Modal */}
            {viewingStory && currentStoryContent && currentStoryUser && (
                <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
                    {/* Progress bar */}
                    <div className="absolute top-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-100"
                            style={{ width: `${storyProgress}%` }}
                        />
                    </div>

                    {/* User info */}
                    <div className="absolute top-8 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                            {currentStoryUser.avatar}
                        </div>
                        <span className="text-white text-sm font-medium">{currentStoryUser.name}</span>
                        <span className="text-white/50 text-xs">2h ago</span>
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => setViewingStory(null)}
                        className="absolute top-8 right-4 text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Story content */}
                    <div
                        className={`w-full h-full bg-gradient-to-br ${currentStoryContent.bg} flex items-center justify-center p-8`}
                    >
                        <p className="text-white text-2xl font-bold text-center leading-relaxed">
                            {currentStoryContent.text}
                        </p>
                    </div>

                    {/* Nav arrows */}
                    <button
                        onClick={() => {
                            const prev = stories.filter((s) => s.hasStory && s.id < viewingStory!);
                            if (prev.length) openStory(prev[prev.length - 1].id);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={() => {
                            const next = stories.filter((s) => s.hasStory && s.id > viewingStory!);
                            if (next.length) openStory(next[0].id);
                            else setViewingStory(null);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            )}
        </>
    );
}
