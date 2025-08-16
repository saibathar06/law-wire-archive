import NewsCard from "./NewsCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const NewsGridContent = () => {
  const { data } = useQuery({
    queryKey: ["news","latest"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, excerpt, category, cover_url, published_at")
        .eq("status","published")
        .order("published_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data || [];
    }
  });

  const items = (data || []).map((n) => ({
    id: (n as any).id,
    title: (n as any).title,
    excerpt: (n as any).excerpt,
    category: (n as any).category,
    date: (n as any).published_at ? new Date((n as any).published_at).toLocaleDateString() : "",
    image: (n as any).cover_url || "/placeholder.svg",
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((article, index) => (
        <NewsCard key={index} {...article} />
      ))}
    </div>
  );
};

const NewsGrid = () => {
  // Loaded from Supabase: latest published articles


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

        <NewsGridContent />
      </div>
    </section>
  );
};

export default NewsGrid;