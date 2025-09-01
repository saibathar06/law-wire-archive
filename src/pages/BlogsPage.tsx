import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import CategorySection from "@/components/news/CategorySection";
import { useBlogs, useBlogsBySubcategory } from "@/hooks/useCategoryData";

const BlogsPage = () => {
  const { data: allBlogs = [], isLoading } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique subcategories from blogs
  const subcategories = [...new Set(allBlogs.map(blog => blog.subcategory).filter(Boolean))];

  const filteredArticles = searchQuery.trim() 
    ? allBlogs.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.subcategory && article.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allBlogs;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="mb-8">
          <Skeleton className="w-full max-w-2xl h-12 rounded-full mx-auto" />
        </div>
        <div className="space-y-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-8 w-48" />
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
    <main className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Blogs
        </h1>
        <p className="text-lg text-muted-foreground">
          Expert insights and analysis on legal matters from our contributors
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 text-lg h-12 rounded-full border-2"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
      </div>

      {/* Content */}
      {searchQuery.trim() ? (
        <div>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">No Blogs Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any blogs matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <a key={`blog-${article.id}-search`} href={`/article/${article.id}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {article.subcategory && (
                    <div className="mb-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {article.subcategory}
                      </span>
                    </div>
                  )}
                  <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{article.summary}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    By {article.author} • {new Date(article.published_date || "").toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-16">
          {/* Show blogs grouped by subcategory */}
          <CategorySection 
            title="All Blogs" 
            articles={allBlogs} 
            subcategories={subcategories.length > 0 ? subcategories : undefined}
          />
        </div>
      )}
    </main>
  );
};

export default BlogsPage;