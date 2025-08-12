import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/news/ArticleCard";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import { useArticlesByCategory, useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { data: allArticles = [] } = useArticles();
  const { data: articles = [], isLoading, error } = useArticlesByCategory(
    category || "",
    subcategory
  );
  const [displayedCount, setDisplayedCount] = useState(12);

  const displayedArticles = articles.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 6);
  };

  const getCategoryTitle = () => {
    if (!category) return "Category";
    
    const categoryNames: Record<string, string> = {
      "legal-updates": "Legal Updates",
      "blogs": "Blogs",
      "case-comments": "Case Comments",
      "fair-review": "Fair Review"
    };

    const subCategoryNames: Record<string, string> = {
      "constitutional-law": "Constitutional Law",
      "family-law": "Family Law",
      "adr-law": "ADR Law",
      "corporate-law": "Corporate Law",
      "tech-law": "Tech Law",
      "case-updates": "Case Updates",
      "landmark-cases": "Landmark Cases"
    };

    if (subcategory) {
      return subCategoryNames[subcategory] || subcategory.replace(/-/g, ' ');
    }

    return categoryNames[category] || category.replace(/-/g, ' ');
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {getCategoryTitle()}
        </h1>
        <p className="text-muted-foreground">
          Latest articles in {getCategoryTitle().toLowerCase()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-52 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No Articles Found
              </h3>
              <p className="text-muted-foreground">
                No articles are available in this category yet.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              
              {/* Load More Button */}
              {displayedCount < articles.length && (
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

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <TrendingSidebar articles={allArticles} />
        </aside>
      </div>
    </main>
  );
};

export default CategoryPage;