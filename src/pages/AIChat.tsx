import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Bot, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  content: "Hello, I'm here to listen and support you. 💚 This is a safe, judgment-free space. How are you feeling today? Share as much or as little as you'd like.",
  role: "assistant",
  timestamp: new Date(),
};

// Supportive responses for demo (will be replaced with real AI)
const supportiveResponses = [
  "Thank you for sharing that with me. It takes courage to open up about how you're feeling. Can you tell me more about what's on your mind?",
  "I hear you, and I want you to know that your feelings are valid. Sometimes just acknowledging what we're going through is an important first step. What do you think might help you feel a bit better right now?",
  "That sounds really challenging. Remember, it's okay to not be okay sometimes. Is there anything specific that's been weighing on you?",
  "I'm here for you. Whatever you're going through, you don't have to face it alone. Would you like to explore some coping strategies together?",
  "Thank you for trusting me with this. Your well-being matters. Have you been able to talk to anyone else about how you're feeling?",
  "I appreciate you being honest with me. Sometimes our feelings can feel overwhelming, but taking time to express them like you're doing now is really healthy. What small thing might bring you a moment of peace today?",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response (will be replaced with real AI integration)
    setTimeout(() => {
      const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-calm-blue/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-calm-blue" />
              </div>
              <div>
                <h1 className="font-display font-semibold text-foreground">AI Companion</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  Always here for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Info banner */}
      <div className="bg-primary/5 border-b border-primary/10 px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="w-4 h-4 text-primary flex-shrink-0" />
          <p>This is a safe, anonymous space. Your conversation is private and not stored.</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4">
        <div className="container mx-auto max-w-2xl">
          <ChatInput
            onSend={handleSend}
            disabled={isTyping}
            placeholder="Share what's on your mind..."
          />
          <p className="text-center text-xs text-muted-foreground py-2">
            <Heart className="w-3 h-3 inline text-accent mr-1" />
            Remember: You matter, and it's okay to ask for help.
          </p>
        </div>
      </div>
    </div>
  );
}
