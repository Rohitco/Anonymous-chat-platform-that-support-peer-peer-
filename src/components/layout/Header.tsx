import { Heart, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">MindSpace</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant={isActive("/search") ? "secondary" : "ghost"} size="icon" className="h-9 w-9">
              <Search className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant={isActive("/settings") ? "secondary" : "ghost"} size="icon" className="h-9 w-9">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
