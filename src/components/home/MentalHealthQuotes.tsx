import { useState, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { text: "Healing takes time, and asking for help is a courageous step.", author: "Mariska Hargitay" },
  { text: "You are not your illness. You have a name, a history, a personality. Staying yourself is part of the battle.", author: "Julian Seifter" },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn" },
  { text: "The strongest people are those who win battles we know nothing about.", author: "Jonathan Harnisch" },
  { text: "Mental health problems don't define who you are. They are something you experience.", author: "Matt Haig" },
  { text: "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.", author: "Oprah Winfrey" },
  { text: "Not until we are lost do we begin to understand ourselves.", author: "Henry David Thoreau" },
  { text: "Out of your vulnerabilities will come your strength.", author: "Sigmund Freud" },
];

export function MentalHealthQuotes() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (dir: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + quotes.length) % quotes.length);
      setFade(true);
    }, 300);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-breathe" />
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-calm-blue/5 rounded-full blur-3xl animate-breathe animation-delay-200" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Daily Inspiration</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Words of Peace & Calm
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-card rounded-3xl p-10 md:p-14 shadow-card relative min-h-[200px] flex flex-col items-center justify-center">
            <div
              className={`transition-all duration-400 text-center ${
                fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <p className="text-xl md:text-2xl text-foreground leading-relaxed italic font-light mb-6">
                "{quotes[current].text}"
              </p>
              <p className="text-muted-foreground font-medium">
                — {quotes[current].author}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => goTo(-1)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-1.5">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 300); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => goTo(1)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
