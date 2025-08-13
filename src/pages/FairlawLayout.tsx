import { useState } from "react";
import { Outlet } from "react-router-dom";
import CompactHeader from "@/components/layout/CompactHeader";
import ContactModal from "@/components/modals/ContactModal";
import Footer from "@/components/Footer";

const FairlawLayout = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <CompactHeader onContactClick={() => setIsContactModalOpen(true)} />
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