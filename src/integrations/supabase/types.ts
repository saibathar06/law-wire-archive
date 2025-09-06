export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      advertisements: {
        Row: {
          ad_code: string
          ad_name: string
          created_at: string
          id: number
          is_active: boolean | null
        }
        Insert: {
          ad_code: string
          ad_name: string
          created_at?: string
          id?: number
          is_active?: boolean | null
        }
        Update: {
          ad_code?: string
          ad_name?: string
          created_at?: string
          id?: number
          is_active?: boolean | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author: string
          category: string | null
          created_at: string | null
          full_content: string | null
          id: number
          image_url: string | null
          is_breaking: boolean | null
          is_trending: boolean | null
          published_date: string | null
          sub_category: string | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category?: string | null
          created_at?: string | null
          full_content?: string | null
          id?: number
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          sub_category?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string | null
          created_at?: string | null
          full_content?: string | null
          id?: number
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          sub_category?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      author_submissions: {
        Row: {
          contact_number: string | null
          created_at: string
          education: string | null
          email: string | null
          id: number
          name: string | null
          qualifications: string | null
        }
        Insert: {
          contact_number?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          id?: number
          name?: string | null
          qualifications?: string | null
        }
        Update: {
          contact_number?: string | null
          created_at?: string
          education?: string | null
          email?: string | null
          id?: number
          name?: string | null
          qualifications?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string
          created_at: string | null
          full_content: string | null
          id: number
          image_url: string | null
          is_breaking: boolean | null
          is_trending: boolean | null
          published_date: string | null
          subcategory: string | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_comments: {
        Row: {
          author: string
          created_at: string | null
          full_content: string | null
          id: number
          image_url: string | null
          is_breaking: boolean | null
          is_trending: boolean | null
          published_date: string | null
          subcategory: string | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: number
          message: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          message: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          message?: string
          name?: string
        }
        Relationships: []
      }
      fair_review: {
        Row: {
          author: string
          created_at: string | null
          full_content: string | null
          id: number
          image_url: string | null
          is_breaking: boolean | null
          is_trending: boolean | null
          published_date: string | null
          subcategory: string | null
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string | null
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_updates: {
        Row: {
          author: string
          created_at: string | null
          full_content: string | null
          id: number
          image_url: string | null
          is_breaking: boolean | null
          is_trending: boolean | null
          published_date: string | null
          subcategory: string
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory: string
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          full_content?: string | null
          id?: never
          image_url?: string | null
          is_breaking?: boolean | null
          is_trending?: boolean | null
          published_date?: string | null
          subcategory?: string
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      top_stories: {
        Row: {
          article_id: number
          created_at: string | null
          display_order: number | null
          id: number
          is_breaking: boolean | null
          source_table: string
          updated_at: string | null
        }
        Insert: {
          article_id: number
          created_at?: string | null
          display_order?: number | null
          id?: never
          is_breaking?: boolean | null
          source_table: string
          updated_at?: string | null
        }
        Update: {
          article_id?: number
          created_at?: string | null
          display_order?: number | null
          id?: never
          is_breaking?: boolean | null
          source_table?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      populate_top_stories: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
