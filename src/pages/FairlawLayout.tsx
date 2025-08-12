import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import FairlawHero from "@/components/layout/FairlawHero";
import ContactModal from "@/components/modals/ContactModal";
import Footer from "@/components/Footer";

const FairlawLayout = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <FairlawHero />
      <Navigation onContactClick={() => setIsContactModalOpen(true)} />
      <Outlet />
      <Footer />
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default FairlawLayout;