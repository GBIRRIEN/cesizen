import type { Database } from "@/database.types";

export type Affirmation = Database["public"]["Tables"]["affirmations"]["Row"];
export type DiagnosticResult = Database["public"]["Tables"]["diagnostic_results"]["Row"];
export type UserComplement = Database["public"]["Tables"]["userComplement"]["Row"];
export type Article = Database["public"]["Tables"]["article"]["Row"];
export type Activie = Database["public"]["Tables"]["activite"]["Row"];
export type ArcticleSave = Database["public"]["Tables"]["articles_saves"]["Row"];
export type ArticleCategorie = Database["public"]["Tables"]["art_cat"]["Row"];
export type Categorie = Database["public"]["Tables"]["categorie"]["Row"];

export type Phase = "inspiration" | "apnee" | "expiration";

export type ExerciceRespirationRaw = {
    id: number;
    created_at: string;
    inspiration: number | null;
    apnee: number | null;
    expiration: number | null;
};

export type ExerciceRespiration = {
    id: number;
    inspiration: number;
    apnee: number;
    expiration: number;
}

export type ArticleInsert = Omit<Article, "id" | "created_at">;