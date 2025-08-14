import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CategoryArticle } from "./useCategoryData";

export const useArticlesByCategory = (category: string, subCategory?: string) => {
  return useQuery({
    queryKey: ["category-articles", category, subCategory],
    queryFn: async (): Promise<CategoryArticle[]> => {
      // Convert URL subcategory to database subcategory
      const mapSubcategory = (urlSub: string | undefined): string | undefined => {
        if (!urlSub) return undefined;
        
        const mapping: Record<string, string> = {
          "supreme-court": "Supreme Court",
          "high-court": "High Court",
          "constitutional-law": "Constitutional Law",
          "family-law": "Family Law",
          "adr-law": "ADR Law",
          "corporate-law": "Corporate Law",
          "tech-law": "Tech Law",
          "case-updates": "Case Updates",
          "landmark-cases": "Landmark Cases"
        };
        
        return mapping[urlSub] || urlSub;
      };

      const dbSubcategory = mapSubcategory(subCategory);

      // Map URL category to database operations
      switch (category) {
        case "legal-updates": {
          let query = supabase
            .from("legal_updates")
            .select("*")
            .order("published_date", { ascending: false });
          
          if (dbSubcategory) {
            query = query.eq("subcategory", dbSubcategory);
          }
          
          const { data, error } = await query;
          if (error) throw error;
          return data || [];
        }
        
        case "blogs": {
          let query = supabase
            .from("blogs")
            .select("*")
            .order("published_date", { ascending: false });
          
          if (dbSubcategory) {
            query = query.eq("subcategory", dbSubcategory);
          }
          
          const { data, error } = await query;
          if (error) throw error;
          return data || [];
        }
        
        case "case-comments": {
          let query = supabase
            .from("case_comments")
            .select("*")
            .order("published_date", { ascending: false });
          
          if (dbSubcategory) {
            query = query.eq("subcategory", dbSubcategory);
          }
          
          const { data, error } = await query;
          if (error) throw error;
          return data || [];
        }
        
        case "fair-review": {
          let query = supabase
            .from("fair_review")
            .select("*")
            .order("published_date", { ascending: false });
          
          if (dbSubcategory) {
            query = query.eq("subcategory", dbSubcategory);
          }
          
          const { data, error } = await query;
          if (error) throw error;
          return data || [];
        }
        
        default:
          throw new Error(`Unknown category: ${category}`);
      }
    },
  });
};