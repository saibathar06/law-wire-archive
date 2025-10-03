import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onContactClick: () => void;
}

const Navigation = ({ onContactClick }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: "Legal Updates", slug: "legal-updates" },
    { 
      name: "Blogs", 
      slug: "blogs",
      subcategories: [
        { name: "Constitutional Law", slug: "constitutional-law" },
        { name: "Family Law", slug: "family-law" },
        { name: "ADR Law", slug: "adr-law" },
        { name: "Corporate Law", slug: "corporate-law" },
        { name: "Tech Law", slug: "tech-law" }
      ]
    },
    {
      name: "Case Comments",
      slug: "case-comments",
      subcategories: [
        { name: "Case Updates", slug: "case-updates" },
        { name: "Landmark Cases", slug: "landmark-cases" }
      ]
    },
    { name: "Fair Review", slug: "fair-review" }
  ];

  const handleCategoryClick = (categorySlug: string, subCategorySlug?: string) => {
    if (subCategorySlug) {
      navigate(`/category/${categorySlug}/${subCategorySlug}`);
    } else {
      navigate(`/category/${categorySlug}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-grow space-x-8 py-3 text-sm">
          <Link 
            to="/" 
            className="text-foreground font-medium hover:text-primary tracking-wider transition-colors"
          >
            HOME
          </Link>
          
          {categories.map((category) => (
            <div key={category.slug} className="relative group">
              {category.subcategories ? (
                <>
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className="text-foreground font-medium hover:text-primary tracking-wider transition-colors flex items-center"
                  >
                    {category.name.toUpperCase()}
                    <ChevronDown className="ml-1 h-3 w-3 text-foreground" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-popover rounded-md shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.slug}
                        onClick={() => handleCategoryClick(category.slug, sub.slug)}
                        className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => handleCategoryClick(category.slug)}
                  className="text-foreground font-medium hover:text-primary tracking-wider transition-colors"
                >
                  {category.name.toUpperCase()}
                </button>
              )}
            </div>
          ))}
          
          <Link 
            to="/about" 
            className="text-foreground font-medium hover:text-primary tracking-wider transition-colors"
          >
            ABOUT US
          </Link>
          
          <button
            onClick={onContactClick}
            className="text-foreground font-medium hover:text-primary tracking-wider transition-colors"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground text-2xl ml-auto py-3"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background absolute w-full shadow-lg border-t border-border">
          <Link 
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-4 text-foreground font-medium hover:bg-accent"
          >
            HOME
          </Link>
          
          {categories.map((category) => (
            <div key={category.slug}>
              <button
                onClick={() => handleCategoryClick(category.slug)}
                className="block w-full text-left py-3 px-4 text-foreground font-medium hover:bg-accent"
              >
                {category.name.toUpperCase()}
              </button>
              {category.subcategories && (
                <div className="pl-4 bg-muted">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => handleCategoryClick(category.slug, sub.slug)}
                      className="block w-full text-left py-2 px-4 text-sm text-muted-foreground hover:bg-accent"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <Link 
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-3 px-4 text-foreground font-medium hover:bg-accent"
          >
            ABOUT US
          </Link>
          
          <button
            onClick={() => {
              onContactClick();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left py-3 px-4 text-foreground font-medium hover:bg-accent"
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;