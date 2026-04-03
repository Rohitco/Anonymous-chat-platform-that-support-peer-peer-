import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Stories } from "@/components/home/Stories";
import { Feed } from "@/components/home/Feed";
import { Footer } from "@/components/layout/Footer";
import { CrisisButton } from "@/components/home/CrisisButton";

const FeedPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="pt-24">
        <div className="container mx-auto max-w-lg">
          <Stories />
        </div>
        <Feed />
      </main>
      <Footer />
      <BottomNav />
      <CrisisButton />
    </div>
  );
};

export default FeedPage;
