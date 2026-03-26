import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-6">
        <HeroSection />
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
