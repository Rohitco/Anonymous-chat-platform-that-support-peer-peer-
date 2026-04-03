import { Lock as LockIcon, MessageCircle, Shield as ShieldIcon, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden py-24 px-4 font-sans">
      <div className="max-w-4xl mx-auto text-center relative z-10 w-full animate-fade-in-up">
        {/* Centered Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-12 shadow-sm transition-all hover:bg-emerald-100/50">
          <ShieldIcon className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold tracking-tight text-emerald-700">100% Anonymous & Safe</span>
        </div>

        {/* Clean Minimalist Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-8 leading-[1.15]">
          You're Not Alone. <br />
          <span className="text-emerald-600/90 font-medium italic">We're Here</span> For You.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
          A safe, anonymous space to share your thoughts, connect with others who understand, and get compassionate support whenever you need it.
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          <Link to="/ai-chat">
            <Button className="bg-[#558B6E] hover:bg-[#4a7a61] text-white rounded-full px-8 py-7 h-auto text-lg gap-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
              <MessageCircle className="w-5 h-5 opacity-90" />
              Talk to AI Companion
            </Button>
          </Link>
          <Link to="/peer-chat">
            <Button variant="outline" className="border-emerald-100 bg-emerald-50/20 text-emerald-900 hover:bg-emerald-50 rounded-full px-8 py-7 h-auto text-lg gap-3 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm">
              <UsersIcon className="w-5 h-5 opacity-70" />
              Join Peer Support
            </Button>
          </Link>
          <Link to="/private-room">
            <Button className="bg-[#558B6E] hover:bg-[#4a7a61] text-white rounded-full px-8 py-7 h-auto text-lg gap-3 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
              <LockIcon className="w-5 h-5 opacity-90" />
              Private Room
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
