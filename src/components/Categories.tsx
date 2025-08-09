import { Scale, Building2, FileText, Gavel, BookOpen, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const Categories = () => {
  const categories = [
    {
      icon: Scale,
      title: "Supreme Court",
      description: "Latest judgments and proceedings from the apex court",
      count: "1,234 articles"
    },
    {
      icon: Building2,
      title: "High Courts",
      description: "Updates from High Courts across different states",
      count: "856 articles"
    },
    {
      icon: FileText,
      title: "Legal Updates",
      description: "New laws, amendments, and regulatory changes",
      count: "692 articles"
    },
    {
      icon: Gavel,
      title: "Court Proceedings",
      description: "Live updates from ongoing court cases",
      count: "1,089 articles"
    },
    {
      icon: BookOpen,
      title: "Legal Analysis",
      description: "In-depth analysis of legal developments",
      count: "445 articles"
    },
    {
      icon: Users,
      title: "Bar & Bench",
      description: "News about legal professionals and judiciary",
      count: "327 articles"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore legal news organized by different areas of law and jurisdiction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-legal-navy/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-legal-navy group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6 text-legal-navy group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-legal-navy transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;