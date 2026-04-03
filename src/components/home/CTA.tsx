import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-24 bg-gradient-calm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-breathe" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-calm-blue/10 rounded-full blur-3xl animate-breathe animation-delay-200" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Heart className="w-8 h-8 text-primary animate-pulse-soft" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Whether you want to talk to someone right now or join a supportive community,
            we're here for you. Your journey to feeling better starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ai-chat">
              <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                <MessageCircle className="w-5 h-5" />
                Start Chatting Now
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            No registration required • Completely anonymous • Available 24/7
          </p>
        </div>
      </div>
    </section>
  );
}
