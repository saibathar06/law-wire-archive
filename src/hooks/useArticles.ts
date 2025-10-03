import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/lib/supabase";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async (): Promise<Article[]> => {
      // Since there's no "articles" table anymore, return empty array
      // This hook is likely not used anymore but kept for backwards compatibility
      return [];
    },
  });
};

export const useArticleById = (id: string | undefined, table?: 'legal_updates' | 'blogs' | 'case_comments' | 'fair_review') => {
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
      const tables: ('case_comments' | 'blogs' | 'legal_updates' | 'fair_review')[] = ['case_comments', 'blogs', 'legal_updates', 'fair_review'];
      
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
      // Since there's no "articles" table anymore, return empty array
      // This hook is likely not used anymore but kept for backwards compatibility
      return [];
    },
  });
};