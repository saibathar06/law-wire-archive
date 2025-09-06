-- Create top_stories table to curate articles for the top stories section
CREATE TABLE public.top_stories (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article_id bigint NOT NULL,
  source_table text NOT NULL CHECK (source_table IN ('legal_updates', 'blogs', 'case_comments', 'fair_review', 'articles')),
  is_breaking boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(article_id, source_table)
);

-- Enable RLS
ALTER TABLE public.top_stories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Top stories are viewable by everyone" 
ON public.top_stories 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_top_stories_updated_at
BEFORE UPDATE ON public.top_stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically populate top_stories with latest articles from each table
CREATE OR REPLACE FUNCTION public.populate_top_stories()
RETURNS void
LANGUAGE plpgsql
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