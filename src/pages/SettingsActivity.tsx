import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User, Bookmark, Clock, Bell, Timer, Lock, Users, Grid3X3, Ban, MapPin, Activity, MessageSquare, AtSign, MessageCircle, Share2, ShieldOff, Hand, Type, ChevronRight, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SettingItem {
  icon: React.ReactNode;
  label: string;
  slug: string;
  trailing?: string;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

const settingGroups: SettingGroup[] = [
  {
    title: "Preferences",
    items: [
      { icon: <Palette className="w-5 h-5" />, label: "Appearance", slug: "appearance", trailing: "Theme, colors, and more" },
    ],
  },
  {
    title: "Your account",
    items: [
      { icon: <User className="w-5 h-5" />, label: "Accounts Centre", slug: "accounts-centre", trailing: "Password, security, personal details" },
    ],
  },
  {
    title: "How you use MindSpace",
    items: [
      { icon: <Bookmark className="w-5 h-5" />, label: "Saved", slug: "saved" },
      { icon: <Clock className="w-5 h-5" />, label: "Archive", slug: "archive" },
      { icon: <Activity className="w-5 h-5" />, label: "Your activity", slug: "your-activity" },
      { icon: <Bell className="w-5 h-5" />, label: "Notifications", slug: "notifications" },
      { icon: <Timer className="w-5 h-5" />, label: "Time management", slug: "time-management" },
    ],
  },
  {
    title: "Who can see your content",
    items: [
      { icon: <Lock className="w-5 h-5" />, label: "Account privacy", slug: "account-privacy", trailing: "Private" },
      { icon: <Users className="w-5 h-5" />, label: "Close Friends", slug: "close-friends", trailing: "22" },
      { icon: <Grid3X3 className="w-5 h-5" />, label: "Crossposting", slug: "crossposting" },
      { icon: <Ban className="w-5 h-5" />, label: "Blocked", slug: "blocked", trailing: "5" },
      { icon: <MapPin className="w-5 h-5" />, label: "Story, live and location", slug: "story-live-location" },
      { icon: <Activity className="w-5 h-5" />, label: "Activity in Friends tab", slug: "activity-friends" },
    ],
  },
  {
    title: "How others can interact with you",
    items: [
      { icon: <MessageSquare className="w-5 h-5" />, label: "Messages and story replies", slug: "messages-replies" },
      { icon: <AtSign className="w-5 h-5" />, label: "Tags and mentions", slug: "tags-mentions" },
      { icon: <MessageCircle className="w-5 h-5" />, label: "Comments", slug: "comments" },
      { icon: <Share2 className="w-5 h-5" />, label: "Sharing", slug: "sharing" },
      { icon: <ShieldOff className="w-5 h-5" />, label: "Restricted", slug: "restricted", trailing: "0" },
      { icon: <Hand className="w-5 h-5" />, label: "Limit interactions", slug: "limit-interactions", trailing: "Off" },
      { icon: <Type className="w-5 h-5" />, label: "Hidden words", slug: "hidden-words" },
    ],
  },
];

const SettingsActivity = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredGroups = settingGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1 text-center">Settings and activity</h1>
          <div className="w-6" />
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="pl-9 h-9 bg-muted border-none"
            />
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredGroups.map((group) => (
          <div key={group.title} className="py-3">
            <p className="px-4 text-xs text-muted-foreground mb-2 uppercase tracking-wider">{group.title}</p>
            {group.items.map((item) => (
              <button
                key={item.slug}
                onClick={() => navigate(`/setting/${item.slug}`)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <span className="text-foreground">{item.icon}</span>
                <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
                {item.trailing && (
                  <span className="text-xs text-muted-foreground mr-1">{item.trailing}</span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingsActivity;
