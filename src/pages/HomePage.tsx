import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/news/ArticleCard";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const { data: articles = [], isLoading, error } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCount, setDisplayedCount] = useState(12);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [articles, searchQuery]);

  const breakingNews = filteredArticles.find(article => article.is_breaking);
  const displayedArticles = filteredArticles.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          <p>Error loading articles. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search for stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 text-lg h-12 rounded-full border-2"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Breaking News Section */}
          {breakingNews && !searchQuery && (
            <div className="mb-10">
              <ArticleCard article={breakingNews} featured={true} />
            </div>
          )}

          {/* Latest News Section */}
          <div className="mb-10">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-52 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">No Stories Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any articles matching your search.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                
                {/* Load More Button */}
                {displayedCount < filteredArticles.length && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      size="lg"
                      className="font-bold"
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <TrendingSidebar articles={articles} />
        </aside>
      </div>
    </main>
  );
};

export default HomePage;