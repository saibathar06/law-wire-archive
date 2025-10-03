import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TopStoryArticle {
  id: bigint;
  title: string;
  summary: string | null;
  full_content: string | null;
  author: string;
  published_date: string | null;
  image_url: string | null;
  subcategory?: string | null;
  source_table: string;
  is_breaking: boolean;
  display_order: number;
  uniqueKey: string;
  tableName: string;
}

export const useTopStories = (limit: number = 12) => {
  return useQuery({
    queryKey: ["top-stories", limit],
    queryFn: async () => {
      const { data: topStoriesData, error: topStoriesError } = await supabase
        .from("top_stories")
        .select(`
          article_id,
          source_table,
          is_breaking,
          display_order,
          created_at
        `)
        .order("display_order", { ascending: true })
        .limit(limit);
      
      if (topStoriesError) throw topStoriesError;
      if (!topStoriesData) return [];

      // Fetch full article data for each top story
      const articlesPromises = topStoriesData.map(async (topStory) => {
        let articleData: any = null;
        
        // Fetch from the specific table based on source_table
        if (topStory.source_table === 'legal_updates') {
          const { data, error } = await supabase
            .from('legal_updates')
            .select('*')
            .eq('id', topStory.article_id)
            .single();
          if (error) throw error;
          articleData = data;
        } else if (topStory.source_table === 'blogs') {
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', topStory.article_id)
            .single();
          if (error) throw error;
          articleData = data;
        } else if (topStory.source_table === 'case_comments') {
          const { data, error } = await supabase
            .from('case_comments')
            .select('*')
            .eq('id', topStory.article_id)
            .single();
          if (error) throw error;
          articleData = data;
        } else if (topStory.source_table === 'fair_review') {
          const { data, error } = await supabase
            .from('fair_review')
            .select('*')
            .eq('id', topStory.article_id)
            .single();
          if (error) throw error;
          articleData = data;
        }
        
        if (!articleData) throw new Error('Article not found');
        
        return {
          id: articleData.id,
          title: articleData.title,
          summary: articleData.summary,
          full_content: articleData.full_content,
          author: articleData.author,
          published_date: articleData.published_date,
          image_url: articleData.image_url,
          subcategory: articleData.subcategory,
          source_table: topStory.source_table,
          is_breaking: topStory.is_breaking,
          display_order: topStory.display_order,
          uniqueKey: `${topStory.source_table}-${topStory.article_id}`,
          tableName: topStory.source_table
        } as TopStoryArticle;
      });

      const articles = await Promise.all(articlesPromises);
      
      // Sort by latest published date for proper ordering
      return articles.sort((a, b) => {
        if (!a.published_date) return 1;
        if (!b.published_date) return -1;
        return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
      });
    }
  });
};