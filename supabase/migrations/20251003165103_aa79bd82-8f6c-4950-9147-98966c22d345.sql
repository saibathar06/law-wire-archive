-- First, clear and recreate the populate_top_stories function to handle proper selection
DROP FUNCTION IF EXISTS public.populate_top_stories();

CREATE OR REPLACE FUNCTION public.populate_top_stories()
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Clear existing entries
  DELETE FROM public.top_stories;
  
  -- Insert 3 latest articles from each table, ordered by published_date
  WITH combined_articles AS (
    -- Get 3 latest from legal_updates
    (SELECT id, 'legal_updates' as source_table, published_date, false as is_breaking
     FROM public.legal_updates 
     WHERE published_date IS NOT NULL
     ORDER BY published_date DESC 
     LIMIT 3)
    
    UNION ALL
    
    -- Get 3 latest from blogs
    (SELECT id, 'blogs' as source_table, published_date, false as is_breaking
     FROM public.blogs 
     WHERE published_date IS NOT NULL
     ORDER BY published_date DESC 
     LIMIT 3)
    
    UNION ALL
    
    -- Get 3 latest from case_comments
    (SELECT id, 'case_comments' as source_table, published_date, false as is_breaking
     FROM public.case_comments 
     WHERE published_date IS NOT NULL
     ORDER BY published_date DESC 
     LIMIT 3)
    
    UNION ALL
    
    -- Get 3 latest from fair_review
    (SELECT id, 'fair_review' as source_table, published_date, false as is_breaking
     FROM public.fair_review 
     WHERE published_date IS NOT NULL
     ORDER BY published_date DESC 
     LIMIT 3)
  ),
  ranked_articles AS (
    SELECT 
      id as article_id,
      source_table,
      published_date,
      is_breaking,
      ROW_NUMBER() OVER (ORDER BY published_date DESC) as display_order
    FROM combined_articles
  )
  INSERT INTO public.top_stories (article_id, source_table, is_breaking, display_order)
  SELECT article_id, source_table, is_breaking, display_order
  FROM ranked_articles;
  
  -- Mark the latest article as breaking news
  UPDATE public.top_stories 
  SET is_breaking = true 
  WHERE display_order = 1;
END;
$$;

-- Function to add new article to top stories and maintain the list
CREATE OR REPLACE FUNCTION public.add_to_top_stories(
  p_article_id bigint,
  p_source_table text,
  p_published_date timestamp with time zone
)
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Remove breaking status from all articles
  UPDATE public.top_stories SET is_breaking = false;
  
  -- Add new article at the top
  INSERT INTO public.top_stories (article_id, source_table, is_breaking, display_order)
  VALUES (p_article_id, p_source_table, true, 0);
  
  -- Reorder all articles
  WITH ranked AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (ORDER BY 
        CASE WHEN is_breaking THEN 0 ELSE 1 END,
        created_at DESC
      ) as new_order
    FROM public.top_stories
  )
  UPDATE public.top_stories 
  SET display_order = ranked.new_order
  FROM ranked 
  WHERE public.top_stories.id = ranked.id;
  
  -- Remove excess articles (keep only top 20)
  DELETE FROM public.top_stories 
  WHERE id IN (
    SELECT id FROM public.top_stories 
    ORDER BY display_order DESC 
    OFFSET 20
  );
END;
$$;

-- Create triggers for automatic top stories management
CREATE OR REPLACE FUNCTION public.trigger_add_to_top_stories()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Only add to top stories if published_date is set
  IF NEW.published_date IS NOT NULL THEN
    PERFORM public.add_to_top_stories(NEW.id, TG_TABLE_NAME, NEW.published_date);
  END IF;
  RETURN NEW;
END;
$$;

-- Create triggers for each table
DROP TRIGGER IF EXISTS trigger_legal_updates_top_stories ON public.legal_updates;
CREATE TRIGGER trigger_legal_updates_top_stories
  AFTER INSERT ON public.legal_updates
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_add_to_top_stories();

DROP TRIGGER IF EXISTS trigger_blogs_top_stories ON public.blogs;
CREATE TRIGGER trigger_blogs_top_stories
  AFTER INSERT ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_add_to_top_stories();

DROP TRIGGER IF EXISTS trigger_case_comments_top_stories ON public.case_comments;
CREATE TRIGGER trigger_case_comments_top_stories
  AFTER INSERT ON public.case_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_add_to_top_stories();

DROP TRIGGER IF EXISTS trigger_fair_review_top_stories ON public.fair_review;
CREATE TRIGGER trigger_fair_review_top_stories
  AFTER INSERT ON public.fair_review
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_add_to_top_stories();

-- Initialize the top stories with existing data
SELECT public.populate_top_stories();