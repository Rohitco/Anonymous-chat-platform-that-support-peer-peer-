import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
    Sun, Moon, Palette, Bell, BellOff, Shield, Eye, EyeOff, Trash2, LogOut, ChevronRight, User, Lock, Globe, MessageSquare, TreePine, Waves, Sunset, Snowflake, Flower2, Mountain, Wind, Star,
} from "lucide-react";

type Theme = "light" | "dark" | "system";
type VisualTheme = "nature" | "ocean" | "sunset" | "lavender" | "midnight" | "rose" | "forest" | "sand" | "arctic" | "charcoal";

const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
    { value: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
    { value: "system", label: "System", icon: <Palette className="w-4 h-4" /> },
];

const visualThemes: { value: VisualTheme; label: string; icon: React.ReactNode; preview: string; description: string }[] = [
    { value: "nature", label: "Nature", icon: <TreePine className="w-4 h-4" />, preview: "from-[hsl(150,30%,45%)] to-[hsl(150,25%,60%)]", description: "Calming sage greens" },
    { value: "ocean", label: "Ocean", icon: <Waves className="w-4 h-4" />, preview: "from-[hsl(200,60%,45%)] to-[hsl(190,50%,60%)]", description: "Deep sea blues" },
    { value: "sunset", label: "Sunset", icon: <Sunset className="w-4 h-4" />, preview: "from-[hsl(20,70%,55%)] to-[hsl(40,80%,60%)]", description: "Warm amber glow" },
    { value: "lavender", label: "Lavender", icon: <Flower2 className="w-4 h-4" />, preview: "from-[hsl(270,40%,55%)] to-[hsl(280,35%,65%)]", description: "Soft purple dreams" },
    { value: "midnight", label: "Midnight", icon: <Star className="w-4 h-4" />, preview: "from-[hsl(230,35%,30%)] to-[hsl(240,30%,45%)]", description: "Deep indigo night" },
    { value: "rose", label: "Rose", icon: <Flower2 className="w-4 h-4" />, preview: "from-[hsl(340,50%,55%)] to-[hsl(350,45%,65%)]", description: "Gentle pink bloom" },
    { value: "forest", label: "Forest", icon: <Mountain className="w-4 h-4" />, preview: "from-[hsl(140,40%,30%)] to-[hsl(160,35%,45%)]", description: "Earthy deep greens" },
    { value: "sand", label: "Sand Dune", icon: <Wind className="w-4 h-4" />, preview: "from-[hsl(35,50%,55%)] to-[hsl(40,45%,65%)]", description: "Desert warmth" },
    { value: "arctic", label: "Arctic", icon: <Snowflake className="w-4 h-4" />, preview: "from-[hsl(195,60%,70%)] to-[hsl(200,55%,80%)]", description: "Icy cool breeze" },
    { value: "charcoal", label: "Charcoal", icon: <Moon className="w-4 h-4" />, preview: "from-[hsl(0,0%,25%)] to-[hsl(0,0%,40%)]", description: "Sleek monochrome" },
];

const visualThemeVars: Record<VisualTheme, Record<string, string>> = {
    nature: {
        "--primary": "150 30% 45%",
        "--ring": "150 30% 50%",
        "--accent": "15 60% 75%",
        "--calm-blue": "200 50% 70%",
    },
    ocean: {
        "--primary": "200 60% 45%",
        "--ring": "200 55% 50%",
        "--accent": "180 45% 65%",
        "--calm-blue": "210 55% 60%",
    },
    sunset: {
        "--primary": "20 70% 55%",
        "--ring": "25 65% 55%",
        "--accent": "40 80% 60%",
        "--calm-blue": "35 60% 65%",
    },
    lavender: {
        "--primary": "270 40% 55%",
        "--ring": "270 38% 55%",
        "--accent": "300 35% 70%",
        "--calm-blue": "260 45% 65%",
    },
    midnight: {
        "--primary": "230 35% 45%",
        "--ring": "230 33% 50%",
        "--accent": "250 30% 60%",
        "--calm-blue": "220 40% 55%",
    },
    rose: {
        "--primary": "340 50% 55%",
        "--ring": "340 48% 55%",
        "--accent": "10 55% 70%",
        "--calm-blue": "330 45% 65%",
    },
    forest: {
        "--primary": "140 40% 30%",
        "--ring": "140 38% 35%",
        "--accent": "80 35% 55%",
        "--calm-blue": "160 35% 45%",
    },
    sand: {
        "--primary": "35 50% 50%",
        "--ring": "35 48% 50%",
        "--accent": "25 55% 65%",
        "--calm-blue": "40 45% 60%",
    },
    arctic: {
        "--primary": "195 60% 55%",
        "--ring": "195 55% 55%",
        "--accent": "210 50% 70%",
        "--calm-blue": "200 60% 65%",
    },
    charcoal: {
        "--primary": "0 0% 35%",
        "--ring": "0 0% 40%",
        "--accent": "0 0% 55%",
        "--calm-blue": "0 0% 50%",
    },
};

const Settings = () => {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
    const [visualTheme, setVisualTheme] = useState<VisualTheme>(() => (localStorage.getItem("visualTheme") as VisualTheme) || "nature");
    const [notifications, setNotifications] = useState({
        messages: true,
        stories: true,
        supporters: false,
        reminders: true,
    });
    const [privacy, setPrivacy] = useState({
        incognito: false,
        hideActivity: false,
    });
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [accountForm, setAccountForm] = useState({ email: "user@example.com", phone: "" });
    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else if (theme === "light") {
            root.classList.remove("dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.toggle("dark", prefersDark);
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        const vars = visualThemeVars[visualTheme];
        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        localStorage.setItem("visualTheme", visualTheme);
        return () => {
            // Reset on unmount isn't needed since we persist
        };
    }, [visualTheme]);

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">{children}</div>
        </div>
    );

    const Row = ({ icon, label, children, onClick }: { icon: React.ReactNode; label: string; children?: React.ReactNode; onClick?: () => void }) => (
        <div className={`flex items-center justify-between px-4 py-3.5 ${onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""}`} onClick={onClick}>
            <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{icon}</span>
                <span className="text-sm text-foreground">{label}</span>
            </div>
            {children || (onClick && <ChevronRight className="w-4 h-4 text-muted-foreground" />)}
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />
            <main className="pt-20 container mx-auto px-4 max-w-lg">
                <h1 className="text-2xl font-display font-bold text-foreground mb-6">Settings</h1>

                {/* Theme */}
                <Section title="Appearance">
                    <div className="px-4 py-3.5">
                        <p className="text-sm text-foreground mb-3">Mode</p>
                        <div className="flex gap-2">
                            {themeOptions.map((opt) => (
                                <Button
                                    key={opt.value}
                                    variant={theme === opt.value ? "default" : "outline"}
                                    size="sm"
                                    className="flex-1 gap-1.5 text-xs"
                                    onClick={() => setTheme(opt.value)}
                                >
                                    {opt.icon} {opt.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="px-4 py-3.5">
                        <p className="text-sm text-foreground mb-3">Color Theme</p>
                        <div className="grid grid-cols-2 gap-2">
                            {visualThemes.map((vt) => (
                                <button
                                    key={vt.value}
                                    onClick={() => setVisualTheme(vt.value)}
                                    className={`relative flex items-center gap-2.5 p-2.5 rounded-xl border-2 transition-all text-left ${visualTheme === vt.value
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-border hover:border-muted-foreground/30"
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${vt.preview} flex-shrink-0`} />
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-foreground truncate">{vt.label}</p>
                                        <p className="text-[10px] text-muted-foreground truncate">{vt.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Row icon={<Globe className="w-4 h-4" />} label="Language">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="text-sm bg-transparent text-foreground border-none outline-none cursor-pointer"
                        >
                            {["English", "Spanish", "French", "German", "Hindi", "Arabic", "Portuguese", "Japanese", "Korean", "Chinese"].map((l) => (
                                <option key={l}>{l}</option>
                            ))}
                        </select>
                    </Row>
                </Section>

                {/* Notifications */}
                <Section title="Notifications">
                    <Row icon={<MessageSquare className="w-4 h-4" />} label="Direct Messages">
                        <Switch checked={notifications.messages} onCheckedChange={(v) => setNotifications({ ...notifications, messages: v })} />
                    </Row>
                    <Row icon={<Bell className="w-4 h-4" />} label="New Stories">
                        <Switch checked={notifications.stories} onCheckedChange={(v) => setNotifications({ ...notifications, stories: v })} />
                    </Row>
                    <Row icon={<User className="w-4 h-4" />} label="New Supporters">
                        <Switch checked={notifications.supporters} onCheckedChange={(v) => setNotifications({ ...notifications, supporters: v })} />
                    </Row>
                    <Row icon={notifications.reminders ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />} label="Wellness Reminders">
                        <Switch checked={notifications.reminders} onCheckedChange={(v) => setNotifications({ ...notifications, reminders: v })} />
                    </Row>
                </Section>

                {/* Privacy */}
                <Section title="Privacy & Safety">
                    <Row icon={<Eye className="w-4 h-4" />} label="Incognito Mode">
                        <Switch checked={privacy.incognito} onCheckedChange={(v) => setPrivacy({ ...privacy, incognito: v })} />
                    </Row>
                    <Row icon={<EyeOff className="w-4 h-4" />} label="Hide Online Activity">
                        <Switch checked={privacy.hideActivity} onCheckedChange={(v) => setPrivacy({ ...privacy, hideActivity: v })} />
                    </Row>
                    <Row icon={<Lock className="w-4 h-4" />} label="Change Password" onClick={() => { }} />
                    <Row icon={<Shield className="w-4 h-4" />} label="Blocked Users" onClick={() => { }} />
                </Section>

                {/* Account */}
                <Section title="Account">
                    <Row icon={<User className="w-4 h-4" />} label="Account Details" onClick={() => setAccountOpen(true)} />
                    <Row icon={<LogOut className="w-4 h-4" />} label="Log Out" onClick={() => { }} />
                    <div className="px-4 py-3.5">
                        <Button variant="destructive" className="w-full gap-2 text-sm" onClick={() => setDeleteOpen(true)}>
                            <Trash2 className="w-4 h-4" /> Delete Account
                        </Button>
                    </div>
                </Section>
            </main>
            <BottomNav />

            {/* Account Details Dialog */}
            <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Account Details</DialogTitle>
                        <DialogDescription>Manage your account information.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div><Label htmlFor="acc-email">Email</Label><Input id="acc-email" type="email" value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} /></div>
                        <div><Label htmlFor="acc-phone">Phone</Label><Input id="acc-phone" type="tel" value={accountForm.phone} onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })} placeholder="Optional" /></div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={() => setAccountOpen(false)}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription>This action is permanent and cannot be undone. All your data, posts, and messages will be deleted.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button variant="destructive" onClick={() => setDeleteOpen(false)}>Delete Forever</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Settings;
