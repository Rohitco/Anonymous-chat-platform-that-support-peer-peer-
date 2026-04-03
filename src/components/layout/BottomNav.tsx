import { Home, Plus, UserCircle, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const items = [
    { to: "/", icon: Home, label: "Home", active: path === "/" },
    { to: "/start-chat", icon: Plus, label: "Chat", active: path === "/start-chat" },
    { to: "/feed", icon: LayoutList, label: "Stories", active: path === "/feed" },
    { to: "/profile", icon: UserCircle, label: "Profile", active: path === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-elevated">
      <div className="container mx-auto px-4 h-16 flex items-center justify-around max-w-md">
        {items.map((item) => (
          <Button
            key={item.to}
            asChild
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-6 ${item.active ? "text-primary" : "text-muted-foreground"
              }`}
          >
            <Link to={item.to}>
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
