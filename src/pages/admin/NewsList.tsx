import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase, type NewsRecord } from "@/lib/supabase";

const fetchNews = async (): Promise<NewsRecord[]> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data || [];
};

const NewsList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["admin","news"], queryFn: fetchNews });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (!error) refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">News</h1>
        <Button onClick={() => navigate("/admin/news/new")}>New Article</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-destructive">{String(error)}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((n) => (
          <Card key={n.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{n.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
              <div className="text-xs text-muted-foreground">{n.category} • {n.status} • {n.published_at ? new Date(n.published_at).toLocaleDateString() : "—"}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate(`/admin/news/${n.id}`)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(n.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && data?.length === 0 && (
        <div className="text-center text-muted-foreground">No articles yet.</div>
      )}
    </div>
  );
};

export default NewsList;
