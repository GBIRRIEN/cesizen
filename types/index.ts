import type { Database } from "@/database.types";

export type SupabaseUser = {
    id: string;
    aud: string;
    role: string;
    email: string | null;
    phone: string | null;
    created_at: string;
    confirmed_at: string | null;
    last_sign_in_at: string | null;
    app_metadata: {
        provider: string;
        [key: string]: any;
    };
    user_metadata: {
        [key: string]: any;
    };
    identities: Array<{
        id: string;
        user_id: string;
        identity_data: {
            email: string;
        };
        prodiver: string;
        created_at: string;
        last_sign_in_at: string;
        updated_at: string;
    }> | null;
};

export type Affirmation = Database["public"]["Tables"]["affirmations"]["Row"];
export type DiagnosticResult = Database["public"]["Tables"]["diagnostic_results"]["Row"];
export type UserComplement = Database["public"]["Tables"]["userComplement"]["Row"];
export type Article = Database["public"]["Tables"]["article"]["Row"];
export type Activie = Database["public"]["Tables"]["activite"]["Row"];
export type ArticleSave = Database["public"]["Tables"]["articles_saves"]["Row"];
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

export type FullUser = UserComplement & {
    email: string | null;
}

export type ArticleInsert = Omit<Article, "id" | "created_at">;