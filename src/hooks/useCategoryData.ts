import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CategoryArticle = {
  id: number;
  title: string;
  summary: string | null;
  full_content: string | null;
  author: string;
  subcategory: string | null;
  image_url: string | null;
  is_breaking: boolean | null;
  is_trending: boolean | null;
  published_date: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export const useLegalUpdates = () => {
  return useQuery({
    queryKey: ["legal_updates"],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("legal_updates")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching legal updates:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useCaseComments = () => {
  return useQuery({
    queryKey: ["case_comments"],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("case_comments")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching case comments:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useFairReview = () => {
  return useQuery({
    queryKey: ["fair_review"],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("fair_review")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching fair review:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useLegalUpdatesBySubcategory = (subcategory: string) => {
  return useQuery({
    queryKey: ["legal_updates", "subcategory", subcategory],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("legal_updates")
        .select("*")
        .eq("subcategory", subcategory)
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching legal updates by subcategory:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useBlogsBySubcategory = (subcategory: string) => {
  return useQuery({
    queryKey: ["blogs", "subcategory", subcategory],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("subcategory", subcategory)
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching blogs by subcategory:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};

export const useCaseCommentsBySubcategory = (subcategory: string) => {
  return useQuery({
    queryKey: ["case_comments", "subcategory", subcategory],
    queryFn: async (): Promise<CategoryArticle[]> => {
      const { data, error } = await supabase
        .from("case_comments")
        .select("*")
        .eq("subcategory", subcategory)
        .order("published_date", { ascending: false });
      
      if (error) {
        console.error("Error fetching case comments by subcategory:", error);
        throw error;
      }
      
      return data || [];
    },
  });
};