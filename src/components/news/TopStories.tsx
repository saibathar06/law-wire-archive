import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTopStories } from "@/hooks/useTopStories";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TopStoriesProps {}

const TopStories = ({}: TopStoriesProps) => {
  const [displayedCount, setDisplayedCount] = useState(6);
  const { data: topStories = [], isLoading } = useTopStories();
  
  if (isLoading) return null;
  if (!topStories.length) return null;

  const breakingNews = topStories.find(article => article.is_breaking);
  const otherNews = topStories.filter(article => !article.is_breaking);
  const displayedOtherNews = otherNews.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 2);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Top Stories
        </h2>

        {/* Breaking News - Compact Featured Card */}
        {breakingNews && (
          <Link to={`/article/${breakingNews.tableName}/${breakingNews.id}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden mb-8 max-w-full mx-auto border-2 border-destructive/40 bg-gradient-to-r from-destructive/5 to-transparent">
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

        {/* Other News - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedOtherNews.map((article) => (
            <Link key={article.uniqueKey} to={`/article/${article.tableName}/${article.id}`}>
              <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="flex gap-4 p-4">
                {article.image_url && (
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-base line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                    {article.summary}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {article.subcategory && `${article.subcategory} • `}
                    {formatDate(article.published_date)}
                  </p>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>

        {/* Load More Button at the bottom */}
        {displayedCount < otherNews.length && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={loadMore}
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

export default TopStories;
