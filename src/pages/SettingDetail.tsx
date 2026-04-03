import { BottomNav } from "@/components/layout/BottomNav";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const settingDetails: Record<string, { title: string; description: string; toggles?: { label: string; defaultOn: boolean }[] }> = {
  "accounts-centre": {
    title: "Accounts Centre",
    description: "Manage your password, security settings, personal details, and ad preferences all in one place.",
    toggles: [
      { label: "Two-factor authentication", defaultOn: false },
      { label: "Login alerts", defaultOn: true },
      { label: "Save login info", defaultOn: true },
    ],
  },
  saved: {
    title: "Saved",
    description: "View all your saved posts, stories, and resources.",
  },
  archive: {
    title: "Archive",
    description: "View your archived stories and posts. Only you can see these.",
  },
  "your-activity": {
    title: "Your Activity",
    description: "Review your interactions, time spent, and activity history.",
    toggles: [
      { label: "Show activity status", defaultOn: true },
    ],
  },
  notifications: {
    title: "Notifications",
    description: "Choose what you want to be notified about.",
    toggles: [
      { label: "Push notifications", defaultOn: true },
      { label: "Message notifications", defaultOn: true },
      { label: "Story notifications", defaultOn: false },
      { label: "Community updates", defaultOn: true },
    ],
  },
  "time-management": {
    title: "Time Management",
    description: "Set daily time limits and reminders to take breaks.",
    toggles: [
      { label: "Daily reminder", defaultOn: false },
      { label: "Break reminders", defaultOn: false },
    ],
  },
  "account-privacy": {
    title: "Account Privacy",
    description: "Control who can see your content and activity.",
    toggles: [
      { label: "Private account", defaultOn: true },
      { label: "Show activity status", defaultOn: false },
      { label: "Allow sharing to stories", defaultOn: true },
    ],
  },
  "close-friends": {
    title: "Close Friends",
    description: "People you've added to your close friends list will see a special badge and can view your private stories.",
  },
  crossposting: {
    title: "Crossposting",
    description: "Manage how your content is shared across platforms.",
    toggles: [
      { label: "Auto-share stories", defaultOn: false },
      { label: "Auto-share posts", defaultOn: false },
    ],
  },
  blocked: {
    title: "Blocked",
    description: "People you've blocked won't be able to find your profile, posts, or stories.",
  },
  "story-live-location": {
    title: "Story, Live and Location",
    description: "Control your story, live, and location sharing settings.",
    toggles: [
      { label: "Allow sharing", defaultOn: true },
      { label: "Save story to archive", defaultOn: true },
      { label: "Allow location sharing", defaultOn: false },
    ],
  },
  "activity-friends": {
    title: "Activity in Friends Tab",
    description: "Control what your friends see about your activity.",
    toggles: [
      { label: "Show in friends tab", defaultOn: true },
    ],
  },
  "messages-replies": {
    title: "Messages and Story Replies",
    description: "Control who can message you and reply to your stories.",
    toggles: [
      { label: "Allow message requests", defaultOn: true },
      { label: "Allow story replies", defaultOn: true },
    ],
  },
  "tags-mentions": {
    title: "Tags and Mentions",
    description: "Control who can tag and mention you.",
    toggles: [
      { label: "Allow tags from everyone", defaultOn: false },
      { label: "Allow mentions from everyone", defaultOn: true },
    ],
  },
  comments: {
    title: "Comments",
    description: "Manage comment controls and filters.",
    toggles: [
      { label: "Allow comments from everyone", defaultOn: true },
      { label: "Filter offensive comments", defaultOn: true },
    ],
  },
  sharing: {
    title: "Sharing",
    description: "Control how your content can be shared.",
    toggles: [
      { label: "Allow resharing to stories", defaultOn: true },
      { label: "Allow resharing to messages", defaultOn: true },
    ],
  },
  restricted: {
    title: "Restricted",
    description: "Restricted accounts can still see your posts but their comments and messages will be hidden.",
  },
  "limit-interactions": {
    title: "Limit Interactions",
    description: "Temporarily limit unwanted interactions from accounts that aren't following you.",
    toggles: [
      { label: "Limit interactions", defaultOn: false },
    ],
  },
  "hidden-words": {
    title: "Hidden Words",
    description: "Automatically hide comments and messages that contain offensive words or phrases.",
    toggles: [
      { label: "Hide offensive words", defaultOn: true },
      { label: "Custom word filter", defaultOn: false },
    ],
  },
};

const SettingDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const detail = settingDetails[slug || ""] || { title: slug?.replace(/-/g, " ") || "Setting", description: "Configure this setting." };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1 text-center capitalize">{detail.title}</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <p className="text-sm text-muted-foreground">{detail.description}</p>

        {detail.toggles && detail.toggles.length > 0 && (
          <div className="space-y-1">
            {detail.toggles.map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between py-3 border-b border-border/50">
                <span className="text-sm text-foreground">{toggle.label}</span>
                <Switch defaultChecked={toggle.defaultOn} />
              </div>
            ))}
          </div>
        )}

        {!detail.toggles && (
          <div className="rounded-lg bg-muted/50 p-6 text-center">
            <p className="text-sm text-muted-foreground">No items yet</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SettingDetail;
