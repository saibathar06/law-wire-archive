-- Enable Row Level Security on articles table
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on contact_submissions table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for articles table (public read access)
CREATE POLICY "Articles are viewable by everyone" 
ON public.articles 
FOR SELECT 
USING (true);

-- Create policies for contact_submissions table (public insert access)
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Note: Admin policies for INSERT/UPDATE/DELETE operations can be added later when authentication is implemented