import { useState } from "react";
import { Users, Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const experiences = [
  { id: "anxiety", label: "Anxiety", emoji: "😰" },
  { id: "depression", label: "Depression", emoji: "😔" },
  { id: "loneliness", label: "Loneliness", emoji: "🫂" },
  { id: "grief", label: "Grief & Loss", emoji: "💔" },
  { id: "stress", label: "Work Stress", emoji: "😤" },
  { id: "relationships", label: "Relationships", emoji: "💬" },
  { id: "self-esteem", label: "Self-Esteem", emoji: "🪞" },
  { id: "trauma", label: "Trauma", emoji: "🌧️" },
  { id: "addiction", label: "Addiction Recovery", emoji: "🌱" },
  { id: "sleep", label: "Sleep Issues", emoji: "😴" },
  { id: "eating", label: "Eating Concerns", emoji: "🍃" },
  { id: "identity", label: "Identity & Purpose", emoji: "🧭" },
];

interface PeerMatchingScreenProps {
  onConnect: (selectedExperiences: string[]) => void;
}

export function PeerMatchingScreen({ onConnect }: PeerMatchingScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleConnect = () => {
    setIsSearching(true);
    setTimeout(() => {
      onConnect(selected);
    }, 2500);
  };

  if (isSearching) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center animate-fade-in-up">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-primary/30 animate-ping animation-delay-200" />
            <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-primary animate-pulse-soft" />
            </div>
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Finding Your Match...
          </h3>
          <p className="text-muted-foreground text-sm">
            Connecting you with someone who understands
          </p>
          <div className="flex gap-2 justify-center mt-4">
            {selected.map((id) => {
              const exp = experiences.find((e) => e.id === id);
              return (
                <span key={id} className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                  {exp?.emoji} {exp?.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Find Your Support Match
          </h2>
          <p className="text-muted-foreground text-sm">
            Select up to 3 topics you'd like to connect over. We'll match you with someone who understands.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => toggle(exp.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border-2 text-left text-sm font-medium transition-all duration-200 ${
                selected.includes(exp.id)
                  ? "border-primary bg-primary/10 text-primary shadow-soft"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <span className="text-lg">{exp.emoji}</span>
              <span className="truncate">{exp.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button
            variant="hero"
            size="xl"
            className="w-full gap-2"
            disabled={selected.length === 0}
            onClick={handleConnect}
          >
            <Sparkles className="w-5 h-5" />
            {selected.length === 0
              ? "Select a Topic to Connect"
              : `Connect with Similar People (${selected.length}/3)`}
            {selected.length > 0 && <ArrowRight className="w-5 h-5" />}
          </Button>
          <button
            onClick={() => onConnect([])}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip & join open room →
          </button>
        </div>
      </div>
    </div>
  );
}
