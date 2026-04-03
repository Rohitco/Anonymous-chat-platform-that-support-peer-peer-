import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIChat from "./pages/AIChat";
import PeerChat from "./pages/PeerChat";
import PrivateRoom from "./pages/PrivateRoom";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import ChatHistory from "./pages/ChatHistory";
import StartChat from "./pages/StartChat";
import SettingsActivity from "./pages/SettingsActivity";
import SettingDetail from "./pages/SettingDetail";
import NotFound from "./pages/NotFound";
import FeedPage from "./pages/FeedPage";
import { FloatingAIAgent } from "./components/FloatingAIAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingAIAgent />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/peer-chat" element={<PeerChat />} />
          <Route path="/private-room" element={<PrivateRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<SettingsActivity />} />
          <Route path="/history" element={<ChatHistory />} />
          <Route path="/start-chat" element={<StartChat />} />
          <Route path="/setting/appearance" element={<Settings />} />
          <Route path="/setting/:slug" element={<SettingDetail />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
