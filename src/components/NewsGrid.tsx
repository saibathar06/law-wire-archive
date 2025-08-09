import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/button";

const NewsGrid = () => {
  const newsArticles = [
    {
      title: "Constitutional Bench to Hear Plea on Article 370",
      excerpt: "A five-judge constitutional bench will examine the constitutional validity of the abrogation of Article 370 provisions related to Jammu and Kashmir.",
      category: "Constitutional Law",
      date: "6 hours ago"
    },
    {
      title: "Bombay HC Grants Bail in High-Profile Corporate Fraud Case",
      excerpt: "The Bombay High Court has granted bail to the accused in a major corporate fraud case involving misappropriation of funds worth several crores.",
      category: "Criminal Law",
      date: "8 hours ago"
    },
    {
      title: "SC Issues Notice on Plea Against Electoral Bonds Scheme",
      excerpt: "The Supreme Court has issued notice to the Centre and Election Commission on a plea challenging the Electoral Bonds Scheme for political funding.",
      category: "Election Law",
      date: "12 hours ago"
    },
    {
      title: "Karnataka HC Directs State to Frame Policy on Gig Workers",
      excerpt: "The Karnataka High Court has directed the state government to frame a comprehensive policy for the welfare and rights of gig economy workers.",
      category: "Labor Law",
      date: "1 day ago"
    },
    {
      title: "SEBI Regulations: New Guidelines for Cryptocurrency Trading",
      excerpt: "The Securities and Exchange Board of India has issued new guidelines regulating cryptocurrency trading platforms and investor protection measures.",
      category: "Financial Law",
      date: "1 day ago"
    },
    {
      title: "Supreme Court Upholds Right to Information Act Amendments",
      excerpt: "In a significant judgment, the Supreme Court has upheld recent amendments to the Right to Information Act while emphasizing transparency in governance.",
      category: "Administrative Law",
      date: "2 days ago"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Latest Legal Updates
          </h2>
          <Button variant="outline" className="border-legal-navy text-legal-navy hover:bg-legal-navy hover:text-primary-foreground">
            View All News
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;