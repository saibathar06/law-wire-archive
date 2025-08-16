import { Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface NewsCardProps {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  featured?: boolean;
}

const NewsCard = ({ id, title, excerpt, category, date, image, featured = false }: NewsCardProps) => {
  const cardContent = (
    <Card className={`group hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer overflow-hidden ${
      featured ? "md:col-span-2 lg:col-span-2" : ""
    }`}>
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline" className="text-legal-navy border-legal-navy">
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>
        
        <h3 className={`font-semibold text-foreground group-hover:text-legal-navy transition-colors mb-2 line-clamp-2 ${
          featured ? "text-xl lg:text-2xl" : "text-lg"
        }`}>
          {title}
        </h3>
        
        <p className={`text-muted-foreground line-clamp-3 ${
          featured ? "text-base" : "text-sm"
        }`}>
          {excerpt}
        </p>
      </div>
    </Card>
  );

  if (id) {
    return (
      <Link to={`/article/${id}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default NewsCard;