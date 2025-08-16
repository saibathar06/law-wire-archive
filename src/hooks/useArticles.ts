import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/lib/supabase";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useArticleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async (): Promise<Article | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", parseInt(id))
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching article:", error);
        throw error;
      }
      
      return data;
    },
    enabled: !!id,
  });
};

export const useArticlesByCategory = (category: string, subCategory?: string) => {
  return useQuery({
    queryKey: ["articles", "category", category, subCategory],
    queryFn: async (): Promise<Article[]> => {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("category", category)
        .order("published_date", { ascending: false });
      
      if (subCategory) {
        query = query.eq("sub_category", subCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching articles by category:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};