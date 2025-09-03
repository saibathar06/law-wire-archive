import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useArticleById } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const ArticlePage = () => {
  const { id } = useParams();
  const { data: article, isLoading, error } = useArticleById(id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          <p>Error loading article. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="bg-card rounded-lg overflow-hidden">
          <Skeleton className="w-full h-96" />
          <div className="p-6 md:p-8 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-64" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed. (ID: {id})
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <Button 
          asChild
          variant="outline" 
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </Button>

        <article className="bg-card rounded-lg overflow-hidden shadow-lg max-w-[800px] mx-auto">
          <div className="w-full text-center">
            <img
              src={article.image_url || 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
              alt={article.title}
              className="w-full h-auto max-w-full max-h-[40vh] sm:max-h-[50vh] md:max-h-96 object-cover mx-auto"
              style={{ height: 'auto' }}
            />
          </div>
          
          <div className="px-4 sm:px-5 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10">
            {article.sub_category && (
              <Badge variant="destructive" className="mb-4 md:mb-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
                {article.sub_category}
              </Badge>
            )}
            
            <h1 className="font-serif font-bold text-card-foreground mb-4 md:mb-6 leading-tight"
                style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                  lineHeight: 'clamp(1.2, 4vw, 1.3)'
                }}>
              {article.title}
            </h1>
            
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 md:mb-8 pb-4 md:pb-6 border-b border-border">
              By <span className="font-medium">{article.author}</span> | {formatDate(article.published_date)}
            </div>
            
            <div className="prose prose-sm sm:prose md:prose-lg max-w-none text-card-foreground">
              <div 
                className="article-content text-base sm:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: article.full_content
                    .split('\n')
                    .filter(paragraph => paragraph.trim() !== '')
                    .map(paragraph => `<p class="mb-6 leading-relaxed">${paragraph.trim()}</p>`)
                    .join('') 
                }}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticlePage;