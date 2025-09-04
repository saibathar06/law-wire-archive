-- Add check constraints for subcategories in each table

-- Legal updates: only allow "High Court" and "Supreme Court"
ALTER TABLE legal_updates 
ADD CONSTRAINT check_legal_updates_subcategory 
CHECK (subcategory IN ('High Court', 'Supreme Court'));

-- Blogs: allow constitutional law, family law, ADR law, corporate law, tech law
ALTER TABLE blogs 
ADD CONSTRAINT check_blogs_subcategory 
CHECK (subcategory IN ('Constitutional Law', 'Family Law', 'ADR Law', 'Corporate Law', 'Tech Law'));

-- Case comments: allow case updates and landmark cases
ALTER TABLE case_comments 
ADD CONSTRAINT check_case_comments_subcategory 
CHECK (subcategory IN ('Case Updates', 'Landmark Cases'));