-- Create legal_updates table with subcategories
CREATE TABLE public.legal_updates (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  summary TEXT,
  full_content TEXT,
  author TEXT NOT NULL,
  subcategory TEXT NOT NULL CHECK (subcategory IN ('Supreme Court', 'High Court')),
  image_url TEXT,
  is_breaking BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blogs table with subcategories
CREATE TABLE public.blogs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  summary TEXT,
  full_content TEXT,
  author TEXT NOT NULL,
  subcategory TEXT,
  image_url TEXT,
  is_breaking BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create case_comments table with subcategories
CREATE TABLE public.case_comments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  summary TEXT,
  full_content TEXT,
  author TEXT NOT NULL,
  subcategory TEXT,
  image_url TEXT,
  is_breaking BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fair_review table
CREATE TABLE public.fair_review (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  summary TEXT,
  full_content TEXT,
  author TEXT NOT NULL,
  subcategory TEXT,
  image_url TEXT,
  is_breaking BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  published_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.legal_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fair_review ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Legal updates are viewable by everyone" 
ON public.legal_updates FOR SELECT USING (true);

CREATE POLICY "Blogs are viewable by everyone" 
ON public.blogs FOR SELECT USING (true);

CREATE POLICY "Case comments are viewable by everyone" 
ON public.case_comments FOR SELECT USING (true);

CREATE POLICY "Fair review are viewable by everyone" 
ON public.fair_review FOR SELECT USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_legal_updates_updated_at
  BEFORE UPDATE ON public.legal_updates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_comments_updated_at
  BEFORE UPDATE ON public.case_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fair_review_updated_at
  BEFORE UPDATE ON public.fair_review
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();