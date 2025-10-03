import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CategoryArticleCard from "@/components/news/CategoryArticleCard";
import { useArticlesByCategory } from "@/hooks/useArticlesByCategory";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const { data: articles = [], isLoading, error } = useArticlesByCategory(
    category || "",
    subcategory
  );
  const [displayedCount, setDisplayedCount] = useState(24);

  const displayedArticles = articles.slice(0, displayedCount);

  const loadMore = () => {
    setDisplayedCount(prev => prev + 12);
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
      "supreme-court": "Supreme Court",
      "high-court": "High Court",
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

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedArticles.map((article) => (
                <CategoryArticleCard key={article.id} article={article} />
              ))}
            </div>
            
            {/* Load More Button */}
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
          </>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;