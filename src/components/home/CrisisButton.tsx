import { useState } from "react";
import { Phone, AlertTriangle, X, ExternalLink, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CrisisButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating crisis button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-20 bottom-24 z-[60] w-14 h-14 rounded-full bg-destructive text-destructive-foreground shadow-elevated flex items-center justify-center hover:scale-105 active:scale-95 transition-transform animate-pulse-soft"
        aria-label="Crisis support"
      >
        <AlertTriangle className="w-6 h-6" />
      </button>

      {/* Crisis modal overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-3xl shadow-elevated max-w-md w-full p-8 animate-fade-in-up border border-border">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                You're Not Alone
              </h2>
              <p className="text-muted-foreground text-sm">
                If you're in crisis or experiencing abuse, please reach out immediately. Help is available 24/7.
              </p>
            </div>

            <div className="space-y-3">
              <a href="tel:988" className="block">
                <Button variant="destructive" className="w-full gap-2 h-14 text-base rounded-2xl">
                  <Phone className="w-5 h-5" />
                  Call 988 — Suicide & Crisis Lifeline
                </Button>
              </a>
              <a href="sms:741741&body=HELLO" className="block">
                <Button variant="outline" className="w-full gap-2 h-12 rounded-2xl border-destructive/30 text-foreground hover:bg-destructive/10">
                  <MessageCircle className="w-5 h-5 text-destructive" />
                  Text HOME to 741741 — Crisis Text Line
                </Button>
              </a>
              <a href="tel:18007997233" className="block">
                <Button variant="outline" className="w-full gap-2 h-12 rounded-2xl border-destructive/30 text-foreground hover:bg-destructive/10">
                  <Phone className="w-5 h-5 text-destructive" />
                  1-800-799-7233 — Domestic Violence
                </Button>
              </a>
              <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="ghost" className="w-full gap-2 h-10 text-muted-foreground">
                  <ExternalLink className="w-4 h-4" />
                  More Resources
                </Button>
              </a>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Your safety matters. These services are free, confidential, and available 24/7.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
