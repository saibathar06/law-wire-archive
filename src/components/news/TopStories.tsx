import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoryArticle, useLegalUpdates, useBlogs, useCaseComments, useFairReview } from "@/hooks/useCategoryData";
import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TopStoriesProps {}

const TopStories = ({}: TopStoriesProps) => {
  const { data: legalUpdates = [] } = useLegalUpdates();
  const { data: blogs = [] } = useBlogs();
  const { data: caseComments = [] } = useCaseComments();
  const { data: fairReview = [] } = useFairReview();
  const [displayedCount, setDisplayedCount] = useState(6);

  // Combine all articles from different tables with unique keys
  const allArticles = [
    ...legalUpdates.map(article => ({ ...article, uniqueKey: `legal-${article.id}` })),
    ...blogs.map(article => ({ ...article, uniqueKey: `blog-${article.id}` })),
    ...caseComments.map(article => ({ ...article, uniqueKey: `case-${article.id}` })),
    ...fairReview.map(article => ({ ...article, uniqueKey: `fair-${article.id}` }))
  ];
  
  if (!allArticles.length) return null;

  const breakingNews = allArticles.find(article => article.is_breaking);
  const otherNews = allArticles.filter(article => !article.is_breaking);
  const displayedOtherNews = otherNews.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 6);
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

        {/* Breaking News - Extra Large Featured Card */}
        {breakingNews && (
          <Link to={`/article/${breakingNews.id}`}>
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden mb-16 max-w-6xl mx-auto border-4 border-destructive/30 bg-gradient-to-br from-destructive/5 to-transparent">
            <div className="flex flex-col xl:flex-row gap-8 p-8 md:p-12">
              {breakingNews.image_url && (
                <div className="flex-shrink-0 w-full xl:w-96 h-64 md:h-72 xl:h-80 overflow-hidden rounded-xl">
                  <img 
                    src={breakingNews.image_url} 
                    alt={breakingNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="destructive" className="text-sm font-bold uppercase tracking-wider px-4 py-2">
                    🚨 Breaking News
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(breakingNews.published_date)}
                  </div>
                </div>
                
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  {breakingNews.title}
                </h3>
                
                <p className="text-muted-foreground text-lg md:text-xl line-clamp-4 mb-6">
                  {breakingNews.summary}
                </p>

                <div className="flex items-center gap-3 text-base text-muted-foreground">
                  {(breakingNews as CategoryArticle).subcategory && (
                    <>
                      <Badge variant="outline" className="text-sm">
                        {(breakingNews as CategoryArticle).subcategory}
                      </Badge>
                      <span>•</span>
                    </>
                  )}
                  <span>By {breakingNews.author}</span>
                </div>
              </div>
            </div>
          </Card>
          </Link>
        )}

        {/* Other News - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedOtherNews.map((article) => (
            <Link key={article.uniqueKey} to={`/article/${article.id}`}>
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
                    {(article as CategoryArticle).subcategory && `${(article as CategoryArticle).subcategory} • `}
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
