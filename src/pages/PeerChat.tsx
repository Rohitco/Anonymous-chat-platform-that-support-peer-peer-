import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Info, Users, UserPlus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { PeerMatchingScreen } from "@/components/peer/PeerMatchingScreen";

const ANONYMOUS_NAMES = [
  "Gentle Cloud", "Quiet River", "Soft Breeze", "Calm Wave",
  "Peaceful Dawn", "Warm Sunset", "Kind Star", "Bright Moon"
];

function generateAnonymousName() {
  return ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)];
}

const SYSTEM_MESSAGE: Message = {
  id: "system",
  content: "Welcome to the peer support room. This is a safe space to connect with others who understand. Everyone here is anonymous. Be kind and supportive to each other. 💚",
  role: "assistant",
  timestamp: new Date(),
};

const demoPeers = [
  { name: "Gentle Cloud", message: "Hi everyone. Having a tough day, but glad to be here." },
  { name: "Quiet River", message: "Welcome! We're all here to support each other. What's going on?" },
];

export default function PeerChat() {
  const [matched, setMatched] = useState(false);
  const [matchedTopics, setMatchedTopics] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([SYSTEM_MESSAGE]);
  const [myName] = useState(() => generateAnonymousName());
  const [onlineCount] = useState(Math.floor(Math.random() * 10) + 5);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConnect = (selectedExperiences: string[]) => {
    setMatchedTopics(selectedExperiences);
    setMatched(true);
    setIsConnecting(true);

    setTimeout(() => setIsConnecting(false), 1500);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: "peer-1",
        content: demoPeers[0].message,
        role: "peer" as const,
        senderName: demoPeers[0].name,
        timestamp: new Date(),
      }]);
    }, 3000);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: "peer-2",
        content: demoPeers[1].message,
        role: "peer" as const,
        senderName: demoPeers[1].name,
        timestamp: new Date(),
      }]);
    }, 5000);
  };

  const handleSend = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const responses = [
        "Thank you for sharing. We're here for you. 💚",
        "I understand how that feels. You're not alone in this.",
        "That sounds really hard. We're here to listen.",
        "Sending you positive thoughts. Take your time.",
      ];
      const peerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "peer",
        senderName: ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, peerMessage]);
    }, 2000 + Math.random() * 2000);
  };

  if (!matched) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <h1 className="font-display font-semibold text-foreground">Peer Support</h1>
            </div>
          </div>
        </header>
        <PeerMatchingScreen onConnect={handleConnect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h1 className="font-display font-semibold text-foreground">Peer Support</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {onlineCount} people online
                </p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-primary/10 rounded-lg">
            <UserPlus className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">You: {myName}</span>
          </div>
        </div>
      </header>

      {matchedTopics.length > 0 && (
        <div className="bg-primary/5 border-b border-primary/10 px-4 py-2">
          <div className="container mx-auto flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <span>Matched on:</span>
            {matchedTopics.map((t) => (
              <span key={t} className="px-2 py-0.5 bg-primary/10 rounded-full text-primary font-medium capitalize">{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-accent/10 border-b border-accent/20 px-4 py-3">
        <div className="container mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="w-4 h-4 text-accent flex-shrink-0" />
          <p>You're anonymous here. Be kind, supportive, and respect everyone's privacy.</p>
        </div>
      </div>

      {isConnecting && (
        <div className="bg-calm-blue/10 px-4 py-3">
          <div className="container mx-auto flex items-center justify-center gap-2 text-sm text-calm-blue">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <p>Connecting to the support room...</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-4">
        <div className="container mx-auto max-w-2xl">
          <ChatInput onSend={handleSend} disabled={isConnecting} placeholder="Share with the community..." />
          <p className="text-center text-xs text-muted-foreground py-2">
            Speaking as <span className="font-medium text-primary">{myName}</span> • Messages are not stored
          </p>
        </div>
      </div>
    </div>
  );
}
