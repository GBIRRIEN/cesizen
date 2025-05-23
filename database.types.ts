export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activite: {
        Row: {
          created_at: string
          description: string | null
          icone: string | null
          id: number
          libelle: string | null
          link: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icone?: string | null
          id?: number
          libelle?: string | null
          link?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icone?: string | null
          id?: number
          libelle?: string | null
          link?: string | null
        }
        Relationships: []
      }
      affirmations: {
        Row: {
          created_at: string
          id: number
          libelle: string | null
          points: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          libelle?: string | null
          points?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          libelle?: string | null
          points?: number | null
        }
        Relationships: []
      }
      art_cat: {
        Row: {
          created_at: string
          id_art: number
          id_cat: number
        }
        Insert: {
          created_at?: string
          id_art?: number
          id_cat?: number
        }
        Update: {
          created_at?: string
          id_art?: number
          id_cat?: number
        }
        Relationships: [
          {
            foreignKeyName: "art_cat_id_art_fkey"
            columns: ["id_art"]
            isOneToOne: false
            referencedRelation: "article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "art_cat_id_cat_fkey"
            columns: ["id_cat"]
            isOneToOne: false
            referencedRelation: "categorie"
            referencedColumns: ["id"]
          },
        ]
      }
      article: {
        Row: {
          created_at: string
          id: number
          image: string | null
          link: string | null
          resume: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          link?: string | null
          resume?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          link?: string | null
          resume?: string | null
          title?: string | null
        }
        Relationships: []
      }
      articles_saves: {
        Row: {
          id_art: number
          id_user: string
          saved_at: string
        }
        Insert: {
          id_art?: number
          id_user: string
          saved_at?: string
        }
        Update: {
          id_art?: number
          id_user?: string
          saved_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_saves_id_art_fkey"
            columns: ["id_art"]
            isOneToOne: false
            referencedRelation: "article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_saves_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "userComplement"
            referencedColumns: ["id"]
          },
        ]
      }
      categorie: {
        Row: {
          created_at: string
          id: number
          libelle: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          libelle?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          libelle?: string | null
        }
        Relationships: []
      }
      diagnostic_results: {
        Row: {
          created_at: string
          id: number
          message: string | null
          score_max: number | null
          score_min: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          score_max?: number | null
          score_min?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          score_max?: number | null
          score_min?: number | null
        }
        Relationships: []
      }
      exercice_respiration: {
        Row: {
          apnee: number | null
          created_at: string
          expiration: number | null
          id: number
          inspiration: number | null
        }
        Insert: {
          apnee?: number | null
          created_at?: string
          expiration?: number | null
          id?: number
          inspiration?: number | null
        }
        Update: {
          apnee?: number | null
          created_at?: string
          expiration?: number | null
          id?: number
          inspiration?: number | null
        }
        Relationships: []
      }
      userComplement: {
        Row: {
          created_at: string
          id: string
          nom: string | null
          prenom: string | null
          role: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string | null
          prenom?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
