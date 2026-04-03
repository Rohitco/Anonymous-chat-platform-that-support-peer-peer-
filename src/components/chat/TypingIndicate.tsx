import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in-up">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-calm-blue/20 flex items-center justify-center">
        <Bot className="w-4 h-4 text-calm-blue" />
      </div>
      <div className="message-ai px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
