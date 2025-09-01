import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedNews from "@/components/FeaturedNews";
import Categories from "@/components/Categories";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import ContactModal from "@/components/modals/ContactModal";

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={() => setIsContactModalOpen(true)} />
      <Hero />
      <FeaturedNews />
      <Categories />
      <NewsGrid />
      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Index;
