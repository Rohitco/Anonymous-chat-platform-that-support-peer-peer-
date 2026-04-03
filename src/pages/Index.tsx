import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Hero } from "@/components/home/Hero";
import { MentalHealthQuotes } from "@/components/home/MentalHealthQuotes";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";
import { Footer } from "@/components/layout/Footer";
import { CrisisButton } from "@/components/home/CrisisButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main>
        <Hero />
        <MentalHealthQuotes />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <BottomNav />
      <CrisisButton />
    </div>
  );
};

export default Index;
