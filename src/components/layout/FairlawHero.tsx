import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FairlawHero = () => {
  return (
    <section className="relative h-96 bg-legal-navy text-primary-foreground">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-legal-navy/70"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <Link 
          to="/" 
          className="text-6xl md:text-8xl font-serif font-bold tracking-wide hover:text-legal-gold transition-colors"
        >
          FAIRLAW
        </Link>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Empowering Legal Minds, Enriching Justice
        </p>
        <Button 
          asChild
          variant="secondary"
          size="lg"
          className="mt-8 bg-background text-foreground hover:bg-legal-gold hover:text-background font-bold transition-all duration-300"
        >
          <Link to="/about">LEARN MORE</Link>
        </Button>
      </div>
    </section>
  );
};

export default FairlawHero;