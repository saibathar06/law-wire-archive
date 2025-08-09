import NewsCard from "./NewsCard";

const FeaturedNews = () => {
  const featuredArticles = [
    {
      title: "Supreme Court Delivers Landmark Judgment on Digital Privacy Rights",
      excerpt: "In a unanimous decision, the Supreme Court has established new precedents for digital privacy protection, affecting millions of citizens across the country. The ruling addresses key concerns about data protection and surveillance.",
      category: "Supreme Court",
      date: "Today",
      image: "/api/placeholder/800/400",
      featured: true
    },
    {
      title: "High Court Orders Investigation into Environmental Violations",
      excerpt: "The Delhi High Court has directed authorities to conduct a comprehensive investigation into alleged environmental violations by industrial units.",
      category: "High Court",
      date: "2 hours ago",
      image: "/api/placeholder/400/300"
    },
    {
      title: "New Amendments to Criminal Procedure Code Announced",
      excerpt: "The Ministry of Law and Justice has announced significant amendments to the Criminal Procedure Code, aimed at expediting justice delivery.",
      category: "Legal Updates",
      date: "4 hours ago",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <section className="py-16 bg-legal-gray-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Breaking Legal News
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest developments in Indian judiciary and legal system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;