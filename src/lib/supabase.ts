import { createClient } from "@supabase/supabase-js";

// Supabase client (public anon key is safe to embed)
const supabaseUrl = "https://pcuqjqxtmdrqgnapkzdr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdXFqcXh0bWRycWduYXBremRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MjQxOTAsImV4cCI6MjA3MDMwMDE5MH0.rdzT0uTSndniuMNqYNjETIixBmm9zBamuQk5-JFy2UA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type NewsRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  category?: string | null;
  cover_url?: string | null;
  tags?: string[] | null;
  status?: "draft" | "published" | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};
