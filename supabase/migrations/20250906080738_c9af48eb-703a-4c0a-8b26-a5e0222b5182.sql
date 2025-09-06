-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.populate_top_stories()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Clear existing entries
  DELETE FROM public.top_stories;
  
  -- Insert 3 latest articles from legal_updates
  INSERT INTO public.top_stories (article_id, source_table, display_order)
  SELECT id, 'legal_updates', ROW_NUMBER() OVER (ORDER BY published_date DESC)
  FROM public.legal_updates
  ORDER BY published_date DESC
  LIMIT 3;
  
  -- Insert 3 latest articles from blogs
  INSERT INTO public.top_stories (article_id, source_table, display_order)
  SELECT id, 'blogs', ROW_NUMBER() OVER (ORDER BY published_date DESC) + 3
  FROM public.blogs
  ORDER BY published_date DESC
  LIMIT 3;
  
  -- Insert 3 latest articles from case_comments
  INSERT INTO public.top_stories (article_id, source_table, display_order)
  SELECT id, 'case_comments', ROW_NUMBER() OVER (ORDER BY published_date DESC) + 6
  FROM public.case_comments
  ORDER BY published_date DESC
  LIMIT 3;
  
  -- Insert 3 latest articles from fair_review
  INSERT INTO public.top_stories (article_id, source_table, display_order)
  SELECT id, 'fair_review', ROW_NUMBER() OVER (ORDER BY published_date DESC) + 9
  FROM public.fair_review
  ORDER BY published_date DESC
  LIMIT 3;
END;
$$;