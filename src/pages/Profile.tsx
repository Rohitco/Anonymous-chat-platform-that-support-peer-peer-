import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Grid3X3, Bookmark, Heart, Settings, Edit2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialPosts = [
    { id: 1, emoji: "🌿", text: "Morning walk", likes: 12 },
    { id: 2, emoji: "📝", text: "Journaling", likes: 8 },
    { id: 3, emoji: "🧘", text: "Meditation", likes: 34 },
    { id: 4, emoji: "🎨", text: "Art therapy", likes: 19 },
    { id: 5, emoji: "📚", text: "Self-help book", likes: 27 },
    { id: 6, emoji: "🌙", text: "Better sleep", likes: 41 },
    { id: 7, emoji: "💪", text: "Exercise", likes: 15 },
    { id: 8, emoji: "🎵", text: "Music therapy", likes: 22 },
    { id: 9, emoji: "🌊", text: "Beach day", likes: 56 },
];

const savedPosts = initialPosts.slice(0, 4);

type Tab = "posts" | "saved";

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("posts");
    const [editOpen, setEditOpen] = useState(false);
    const [storyOpen, setStoryOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);

    // Profile state
    const [profile, setProfile] = useState({
        name: "Peaceful_Mind",
        bio: "🌱 Healing one day at a time",
        tagline: "Mental health advocate • Journaler",
    });
    const [editForm, setEditForm] = useState(profile);

    // Story state
    const [storyText, setStoryText] = useState("");
    const [storyCategory, setStoryCategory] = useState("personal");

    // Message state
    const [msgTo, setMsgTo] = useState("");
    const [msgText, setMsgText] = useState("");

    const displayPosts = activeTab === "posts" ? initialPosts : savedPosts;

    const handleEditSave = () => {
        setProfile(editForm);
        setEditOpen(false);
    };

    const handleStoryShare = () => {
        if (storyText.trim()) {
            setStoryText("");
            setStoryOpen(false);
        }
    };

    const handleMessageSend = () => {
        if (msgText.trim()) {
            setMsgTo("");
            setMsgText("");
            setMessageOpen(false);
            navigate("/messages");
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                {/* Three-dot menu */}
                <div className="flex justify-end mb-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => navigate("/settings")}>
                                Settings and activity
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/saved")}>
                                Saved
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/archive")}>
                                Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/your-activity")}>
                                Your activity
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/notifications")}>
                                Notifications
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/account-privacy")}>
                                Account privacy
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/blocked")}>
                                Blocked
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/setting/close-friends")}>
                                Close Friends
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* Profile header */}
                <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-calm-blue flex items-center justify-center text-3xl shrink-0">
                        🌿
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl font-display font-bold text-foreground">{profile.name}</h1>
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => { setEditForm(profile); setEditOpen(true); }}>
                                <Edit2 className="w-3 h-3" /> Edit
                            </Button>
                        </div>
                        <div className="flex gap-6 my-3">
                            <div className="text-center">
                                <p className="font-bold text-foreground">{initialPosts.length}</p>
                                <p className="text-xs text-muted-foreground">Posts</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-foreground">128</p>
                                <p className="text-xs text-muted-foreground">Supporters</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-foreground">89</p>
                                <p className="text-xs text-muted-foreground">Supporting</p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground">{profile.bio}</p>
                        <p className="text-sm text-muted-foreground">{profile.tagline}</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mb-6">
                    <Button variant="hero" className="flex-1 h-9 text-sm" onClick={() => setStoryOpen(true)}>Share Your Story</Button>
                    <Button variant="outline" className="flex-1 h-9 text-sm" onClick={() => setMessageOpen(true)}>Message</Button>
                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => navigate("/settings")}>
                        <Settings className="w-4 h-4" />
                    </Button>
                </div>

                {/* Highlights */}
                <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide">
                    {["Gratitude", "Wins", "Journey", "Tips"].map((label) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xl">
                                {label === "Gratitude" ? "🙏" : label === "Wins" ? "🏆" : label === "Journey" ? "🛤️" : "💡"}
                            </div>
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-xl text-muted-foreground">+</div>
                        <span className="text-xs text-muted-foreground">New</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border mb-4">
                    <button onClick={() => setActiveTab("posts")} className={`flex-1 py-3 flex justify-center items-center gap-1.5 text-sm transition-colors border-b-2 ${activeTab === "posts" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}>
                        <Grid3X3 className="w-4 h-4" /> Posts
                    </button>
                    <button onClick={() => setActiveTab("saved")} className={`flex-1 py-3 flex justify-center items-center gap-1.5 text-sm transition-colors border-b-2 ${activeTab === "saved" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"}`}>
                        <Bookmark className="w-4 h-4" /> Saved
                    </button>
                </div>

                {/* Post grid */}
                <div className="grid grid-cols-3 gap-1">
                    {displayPosts.map((post) => (
                        <div key={post.id} className="aspect-square bg-gradient-to-br from-primary/10 to-calm-blue/10 rounded-lg flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity cursor-pointer border border-border/50">
                            <span className="text-3xl">{post.emoji}</span>
                            <span className="text-xs text-muted-foreground">{post.text}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Heart className="w-3 h-3" /> {post.likes}</span>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />

            {/* Edit Profile Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your anonymous profile details.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div><Label htmlFor="edit-name">Display Name</Label><Input id="edit-name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} /></div>
                        <div><Label htmlFor="edit-bio">Bio</Label><Input id="edit-bio" value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} /></div>
                        <div><Label htmlFor="edit-tagline">Tagline</Label><Input id="edit-tagline" value={editForm.tagline} onChange={(e) => setEditForm({ ...editForm, tagline: e.target.value })} /></div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="hero" onClick={handleEditSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Share Your Story Dialog */}
            <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Share Your Story</DialogTitle>
                        <DialogDescription>Share anonymously with the community.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div>
                            <Label>Category</Label>
                            <div className="flex gap-2 mt-1 flex-wrap">
                                {["personal", "tips", "gratitude", "wins"].map((cat) => (
                                    <Button key={cat} size="sm" variant={storyCategory === cat ? "hero" : "outline"} className="text-xs capitalize" onClick={() => setStoryCategory(cat)}>{cat}</Button>
                                ))}
                            </div>
                        </div>
                        <div><Label htmlFor="story-text">Your Story</Label><Textarea id="story-text" value={storyText} onChange={(e) => setStoryText(e.target.value)} placeholder="What's on your mind?" rows={5} /></div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="hero" onClick={handleStoryShare} disabled={!storyText.trim()}>Share</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Send Message Dialog */}
            <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Send Message</DialogTitle>
                        <DialogDescription>Send an anonymous private message.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div><Label htmlFor="msg-to">To</Label><Input id="msg-to" value={msgTo} onChange={(e) => setMsgTo(e.target.value)} placeholder="Username..." /></div>
                        <div><Label htmlFor="msg-text">Message</Label><Textarea id="msg-text" value={msgText} onChange={(e) => setMsgText(e.target.value)} placeholder="Write your message..." rows={4} /></div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="hero" onClick={handleMessageSend} disabled={!msgText.trim()}>Send</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Profile;
