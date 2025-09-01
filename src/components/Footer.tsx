import { Scale, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-legal-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-legal-gold" />
              <h3 className="text-xl font-bold">LegalNews</h3>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Your trusted source for comprehensive legal news and judicial updates from across India.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                contact@legalnews.com
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +91 11 1234 5678
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                New Delhi, India
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-legal-gold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Latest News</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Supreme Court</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">High Courts</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Legal Updates</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-legal-gold transition-colors">ADR Law</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Constitutional Law</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Corporate Law</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Family Law</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Tech Law</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-legal-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Editorial Policy</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-legal-gold transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-primary-foreground/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 LegalNews. All rights reserved.
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2 md:mt-0">
            Committed to accurate and timely legal reporting
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;