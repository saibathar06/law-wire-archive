import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryArticle } from "@/hooks/useCategoryData";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CategorySectionProps {
  title: string;
  articles: CategoryArticle[];
  subcategories?: string[];
  showViewMore?: boolean;
  viewMoreLink?: string;
  tableName: string; // Add table name to determine correct URLs
}

const CategorySection = ({ title, articles, subcategories, showViewMore = false, viewMoreLink, tableName }: CategorySectionProps) => {
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {title}
          </h2>
          {showViewMore && viewMoreLink && (
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href={viewMoreLink}>View More</a>
            </Button>
          )}
        </div>

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
                {/* Breaking News - Properly Sized Featured Card */}
                {breakingNews && (
                  <Link to={`/article/${tableName}/${breakingNews.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden md:col-span-2 lg:col-span-3 mb-8 max-w-full mx-auto border-2 border-destructive/40 bg-gradient-to-r from-destructive/5 to-transparent">
                      <div className="flex flex-col sm:flex-row gap-6 p-6 md:p-8">
                        {breakingNews.image_url && (
                          <div className="flex-shrink-0 w-full sm:w-80 h-48 sm:h-44 overflow-hidden rounded-lg">
                            <img 
                              src={breakingNews.image_url} 
                              alt={breakingNews.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge variant="destructive" className="text-sm font-bold uppercase tracking-wider px-3 py-1">
                              🚨 Breaking News
                            </Badge>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(breakingNews.published_date)}
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-4 text-xl md:text-2xl lg:text-3xl leading-tight">
                            {breakingNews.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">
                            {breakingNews.summary}
                          </p>

                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            {breakingNews.subcategory && (
                              <>
                                <Badge variant="outline" className="text-sm px-2 py-1">
                                  {breakingNews.subcategory}
                                </Badge>
                                <span>•</span>
                              </>
                            )}
                            <span className="font-medium">By {breakingNews.author}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )}

                {/* Regular News - Standard Cards */}
                {displayedArticles.map((article) => (
                  <Link key={article.id} to={`/article/${tableName}/${article.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
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
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Load More Button at the bottom of all sections */}
        {displayedCount < articles.length && (
          <div className="text-center mt-12">
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
    </section>
  );
};

export default CategorySection;