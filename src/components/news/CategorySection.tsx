import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryArticle } from "@/hooks/useCategoryData";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategorySectionProps {
  title: string;
  articles: CategoryArticle[];
  subcategories?: string[];
}

const CategorySection = ({ title, articles, subcategories }: CategorySectionProps) => {
  const [displayedCount, setDisplayedCount] = useState(15);

  if (!articles.length) return null;

  const loadMore = () => {
    setDisplayedCount(prev => prev + 12);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  const groupedBySubcategory = subcategories 
    ? subcategories.reduce((acc, sub) => {
        acc[sub] = articles.filter(article => article.subcategory === sub);
        return acc;
      }, {} as Record<string, CategoryArticle[]>)
    : { [title]: articles };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {title}
        </h2>

        {Object.entries(groupedBySubcategory).map(([subcategoryName, subcategoryArticles]) => {
          if (!subcategoryArticles.length) return null;

          const breakingNews = subcategoryArticles.find(article => article.is_breaking);
          const regularNews = subcategoryArticles.filter(article => !article.is_breaking);
          const displayedArticles = regularNews.slice(0, displayedCount - (breakingNews ? 1 : 0));

          return (
            <div key={subcategoryName} className="mb-12">
              {subcategories && (
                <h3 className="text-xl font-semibold text-foreground mb-6 border-l-4 border-primary pl-4">
                  {subcategoryName}
                </h3>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Breaking News - Featured Card */}
                {breakingNews && (
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden md:col-span-2 lg:col-span-2">
                    {breakingNews.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={breakingNews.image_url} 
                          alt={breakingNews.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="destructive" className="bg-red-600 text-white">
                          <Tag className="w-3 h-3 mr-1" />
                          BREAKING
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(breakingNews.published_date)}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-3 text-xl lg:text-2xl line-clamp-2">
                        {breakingNews.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-base line-clamp-3">
                        {breakingNews.summary}
                      </p>
                    </div>
                  </Card>
                )}

                {/* Regular News - Standard Cards */}
                {displayedArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                    {article.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={article.image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="text-primary border-primary">
                          <Tag className="w-3 h-3 mr-1" />
                          {subcategoryName}
                        </Badge>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.published_date)}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-lg line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {article.summary}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More Button for each subcategory */}
              {displayedCount < subcategoryArticles.length && (
                <div className="text-center mt-8">
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    size="lg"
                    className="font-bold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;