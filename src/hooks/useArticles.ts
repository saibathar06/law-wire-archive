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
    queryFn: async (): Promise<any | null> => {
      if (!id) return null;
      
      const articleId = parseInt(id);
      
      // Search in articles table first
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select("*")
        .eq("id", articleId)
        .maybeSingle();
      
      if (!articlesError && articlesData) {
        return { ...articlesData, source_table: 'articles' };
      }
      
      // Search in legal_updates table
      const { data: legalData, error: legalError } = await supabase
        .from("legal_updates")
        .select("*")
        .eq("id", articleId)
        .maybeSingle();
      
      if (!legalError && legalData) {
        return { ...legalData, source_table: 'legal_updates' };
      }
      
      // Search in blogs table
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", articleId)
        .maybeSingle();
      
      if (!blogsError && blogsData) {
        return { ...blogsData, source_table: 'blogs' };
      }
      
      // Search in case_comments table
      const { data: caseData, error: caseError } = await supabase
        .from("case_comments")
        .select("*")
        .eq("id", articleId)
        .maybeSingle();
      
      if (!caseError && caseData) {
        return { ...caseData, source_table: 'case_comments' };
      }
      
      // Search in fair_review table
      const { data: fairData, error: fairError } = await supabase
        .from("fair_review")
        .select("*")
        .eq("id", articleId)
        .maybeSingle();
      
      if (!fairError && fairData) {
        return { ...fairData, source_table: 'fair_review' };
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