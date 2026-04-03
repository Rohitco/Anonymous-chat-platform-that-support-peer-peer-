import { Heart, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">MindSpace</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A safe, anonymous space for mental health support.
              Connect with peers and AI companions who care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/peer-chat" className="hover:text-primary transition-colors">Peer Support</a>
              </li>
              <li>
                <a href="/ai-chat" className="hover:text-primary transition-colors">AI Companion</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Resources</a>
              </li>
            </ul>
          </div>

          {/* Crisis Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-destructive" />
              Crisis Support
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              If you're in crisis, please reach out:
            </p>
            <ul className="space-y-1 text-sm">
              <li className="text-foreground font-medium">988 Suicide & Crisis Lifeline</li>
              <li className="text-muted-foreground">Call or text: 988</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MindSpace. Made with{" "}
            <Heart className="w-3 h-3 inline text-accent" />{" "}
            for mental wellness.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This is not a substitute for professional mental health care.
          </p>
        </div>
      </div>
    </footer>
  );
}
