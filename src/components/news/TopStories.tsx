import { Button } from "@/components/ui/button";
import { Article } from "@/lib/supabase";
import { CategoryArticle } from "@/hooks/useCategoryData";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopStoriesProps {
  articles: (Article | CategoryArticle)[];
}

const TopStories = ({ articles }: TopStoriesProps) => {
  if (!articles.length) return null;

  const breakingNews = articles.find(article => article.is_breaking);
  const otherNews = articles.filter(article => !article.is_breaking).slice(0, 6);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Top Stories
          </h2>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Load more
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Breaking News - Large Card */}
          {breakingNews && (
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden lg:row-span-2">
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
                    LIVE UPDATES
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(breakingNews.published_date)}
                  </div>
                </div>
                
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-3 text-xl lg:text-2xl line-clamp-3">
                  {breakingNews.title}
                </h3>
                
                <p className="text-muted-foreground text-base line-clamp-4">
                  {breakingNews.summary}
                </p>

                <p className="text-sm text-muted-foreground mt-3">
                  {(breakingNews as CategoryArticle).subcategory && `${(breakingNews as CategoryArticle).subcategory} • `}
                  {formatDate(breakingNews.published_date)}
                </p>
              </div>
            </Card>
          )}

          {/* Other News - Small Cards */}
          <div className="space-y-4">
            {otherNews.map((article) => (
              <Card key={article.id} className="group hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
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
                      {(article as CategoryArticle).subcategory && `${(article as CategoryArticle).subcategory} • `}
                      {formatDate(article.published_date)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopStories;
