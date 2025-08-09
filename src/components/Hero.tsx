import { ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-legal-navy to-legal-navy-light text-primary-foreground py-20">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-legal-gold" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Stay Updated with
            <span className="block text-legal-gold">Legal Developments</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
            Your trusted source for comprehensive legal news, court proceedings, 
            and judicial updates from across the country.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-legal-navy hover:bg-primary-foreground/90">
              Latest News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-legal-navy">
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;