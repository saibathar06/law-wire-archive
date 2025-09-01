import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onContactClick?: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-legal-navy to-legal-navy-light rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LL</span>
            </div>
            <h1 className="text-xl font-bold text-legal-navy">LegalNews</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-foreground hover:text-legal-navy transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-legal-navy transition-colors">
              Supreme Court
            </a>
            <a href="#" className="text-muted-foreground hover:text-legal-navy transition-colors">
              High Courts
            </a>
            <a href="#" className="text-muted-foreground hover:text-legal-navy transition-colors">
              Legal Updates
            </a>
            <a href="#" className="text-muted-foreground hover:text-legal-navy transition-colors">
              Judgments
            </a>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="text-muted-foreground hover:text-legal-navy transition-colors"
              >
                Contact
              </button>
            )}
          </nav>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search legal news..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;