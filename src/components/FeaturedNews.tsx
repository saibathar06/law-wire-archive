import NewsCard from "./NewsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const FeaturedNewsContent = () => {
  const { data } = useQuery({
    queryKey: ["news","featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("title, excerpt, category, cover_url, published_at")
        .eq("status","published")
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data || [];
    }
  });

  const items = (data || []).map((n, idx) => ({
    title: n.title,
    excerpt: (n as any).excerpt,
    category: (n as any).category,
    date: n.published_at ? new Date(n.published_at as any).toLocaleDateString() : "",
    image: (n as any).cover_url || "/placeholder.svg",
    featured: idx === 0,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((article, index) => (
        <NewsCard key={index} {...article} />
      ))}
    </div>
  );
};

const FeaturedNews = () => {
  // Fetched from Supabase: latest 3 published articles
  // Table assumed: news (title, excerpt, category, cover_url, status, published_at)


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

        <FeaturedNewsContent />
      </div>
    </section>
  );
};

export default FeaturedNews;