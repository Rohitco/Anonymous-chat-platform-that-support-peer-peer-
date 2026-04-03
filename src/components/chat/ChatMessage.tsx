import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "peer";
  timestamp: Date;
  senderName?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isAI = message.role === "assistant";
  const isPeer = message.role === "peer";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser && "flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
          isUser && "bg-primary/10",
          isAI && "bg-calm-blue/20",
          isPeer && "bg-accent/20"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary" />
        ) : isAI ? (
          <Bot className="w-4 h-4 text-calm-blue" />
        ) : (
          <User className="w-4 h-4 text-accent" />
        )}
      </div>

      {/* Message bubble */}
      <div className={cn("flex flex-col max-w-[75%]", isUser && "items-end")}>
        {isPeer && message.senderName && (
          <span className="text-xs text-muted-foreground mb-1 px-1">
            {message.senderName}
          </span>
        )}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl",
            isUser && "message-self rounded-tr-sm",
            isAI && "message-ai rounded-tl-sm",
            isPeer && "message-other rounded-tl-sm"
          )}
        >
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
