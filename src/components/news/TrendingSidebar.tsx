import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@/lib/supabase";

interface TrendingSidebarProps {
  articles: Article[];
}

const TrendingSidebar = ({ articles }: TrendingSidebarProps) => {
  const trendingArticles = articles.filter(article => article.is_trending).slice(0, 5);

  if (trendingArticles.length === 0) {
    return (
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-card-foreground border-b-2 border-legal-navy pb-2">
            Top Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No trending news available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-card-foreground border-b-2 border-legal-navy pb-2">
          Top Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingArticles.map((article) => (
          <Link 
            key={article.id}
            to={`/article/${article.id}`}
            className="flex items-start space-x-3 group hover:bg-accent rounded-lg p-2 -m-2 transition-colors"
          >
            <img
              src={article.image_url || 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80'}
              alt={article.title}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-grow">
              <p className="font-medium text-card-foreground group-hover:text-primary text-sm leading-tight line-clamp-3">
                {article.title}
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingSidebar;