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

export const useArticleById = (id: string | undefined, table?: 'articles' | 'legal_updates' | 'blogs' | 'case_comments' | 'fair_review') => {
  return useQuery({
    queryKey: ["article", id, table],
    queryFn: async (): Promise<any | null> => {
      if (!id) return null;
      
      const articleId = parseInt(id);
      
      // If table is specified, search in that specific table first
      if (table) {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .eq("id", articleId)
          .maybeSingle();
        
        if (!error && data) {
          return { ...data, source_table: table };
        }
      }
      
      // Search in all tables in priority order (most recent content first)
      const tables: ('case_comments' | 'blogs' | 'legal_updates' | 'fair_review' | 'articles')[] = ['case_comments', 'blogs', 'legal_updates', 'fair_review', 'articles'];
      
      for (const tableName of tables) {
        if (tableName === table) continue; // Skip if already searched above
        
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", articleId)
          .maybeSingle();
        
        if (!error && data) {
          return { ...data, source_table: tableName };
        }
      }
      
      return null; // Article not found in any table
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