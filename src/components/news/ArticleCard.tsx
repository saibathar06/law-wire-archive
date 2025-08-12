import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/supabase";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (featured) {
    return (
      <Link to={`/article/${article.id}`}>
        <Card className="bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
          <div className="md:flex">
            <div className="p-6 md:w-2/3 flex flex-col justify-center">
              {article.sub_category && (
                <Badge variant="destructive" className="w-fit mb-3 text-xs font-bold uppercase tracking-wider">
                  {article.sub_category}
                </Badge>
              )}
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mb-3 leading-tight">
                {article.title}
              </h3>
              <p className="text-card-foreground/80 text-base mb-4 leading-relaxed">
                {article.summary}
              </p>
              <div className="text-sm text-muted-foreground">
                By {article.author} | {formatDate(article.published_date)}
              </div>
              <span className="text-primary hover:underline font-semibold mt-3 inline-block">
                Read More...
              </span>
            </div>
            <div className="md:w-1/3">
              <img
                src={article.image_url || 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={article.title}
                className="w-full h-full object-cover min-h-64"
              />
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`}>
      <Card className="bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full">
        <img
          src={article.image_url || 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
          alt={article.title}
          className="w-full h-52 object-cover"
        />
        <CardContent className="p-4 flex flex-col h-full">
          {article.sub_category && (
            <Badge variant="destructive" className="w-fit mb-2 text-xs font-bold uppercase tracking-wider">
              {article.sub_category}
            </Badge>
          )}
          <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-card-foreground/70 flex-grow line-clamp-3 mb-3">
            {article.summary}
          </p>
          <div className="text-xs text-muted-foreground">
            By {article.author} | {formatDate(article.published_date)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;