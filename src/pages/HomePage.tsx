import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TopStories from "@/components/news/TopStories";
import CategorySection from "@/components/news/CategorySection";
import { useArticles } from "@/hooks/useArticles";
import { 
  useLegalUpdates, 
  useBlogs, 
  useCaseComments, 
  useFairReview 
} from "@/hooks/useCategoryData";

const HomePage = () => {
  const { data: articles = [], isLoading: articlesLoading } = useArticles();
  const { data: legalUpdates = [], isLoading: legalLoading } = useLegalUpdates();
  const { data: blogs = [], isLoading: blogsLoading } = useBlogs();
  const { data: caseComments = [], isLoading: caseLoading } = useCaseComments();
  const { data: fairReview = [], isLoading: fairLoading } = useFairReview();
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all articles for top stories
  const allArticles = [...articles, ...legalUpdates, ...blogs, ...caseComments, ...fairReview];
  
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return allArticles;
    
    return allArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allArticles, searchQuery]);

  const isLoading = articlesLoading || legalLoading || blogsLoading || caseLoading || fairLoading;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Skeleton className="w-full h-12 rounded-full" />
          </div>
        </div>
        <div className="space-y-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="space-y-3">
                    <Skeleton className="h-52 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Search Bar */}
      <div className="container mx-auto px-4 py-8">
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

      {/* Show search results or category sections */}
      {searchQuery.trim() ? (
        <div className="container mx-auto px-4 pb-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Stories Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any articles matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div key={`${article.id}-search`} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{article.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Top Stories Section */}
          <TopStories articles={allArticles.slice(0, 7)} />

          {/* Legal Updates Section */}
          <CategorySection 
            title="Legal Updates" 
            articles={legalUpdates} 
            subcategories={['Supreme Court', 'High Court']}
          />

          {/* Blogs Section */}
          <CategorySection 
            title="Blogs" 
            articles={blogs}
          />

          {/* Case Comments Section */}
          <CategorySection 
            title="Case Comments" 
            articles={caseComments}
          />

          {/* Fair Review Section */}
          <CategorySection 
            title="Fair Review" 
            articles={fairReview}
          />
        </>
      )}
    </main>
  );
};

export default HomePage;