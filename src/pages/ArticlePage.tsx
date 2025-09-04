import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useArticleById } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";

const ArticlePage = () => {
  const { id, table } = useParams<{ id: string; table?: string }>();
  const { data: article, isLoading, error } = useArticleById(id, table as any);

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button 
        asChild
        variant="outline" 
        className="mb-6"
      >
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </Button>

      <article className="bg-card rounded-lg overflow-hidden">
        <img
          src={article.image_url || 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
          alt={article.title}
          className="w-full h-auto max-h-96 object-cover"
        />
        
        <div className="p-6 md:p-8">
          {article.sub_category && (
            <Badge variant="destructive" className="mb-4 text-sm font-bold uppercase tracking-wider">
              {article.sub_category}
            </Badge>
          )}
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            By {article.author} | {formatDate(article.published_date)}
          </div>
          
          <div className="prose prose-lg max-w-none text-card-foreground leading-relaxed">
            <div 
              className="text-base md:text-lg leading-7 md:leading-8 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ 
                __html: article.full_content.replace(/\n/g, '<br />') 
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;