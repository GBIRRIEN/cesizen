import { supabase } from "@/lib/supabase";

/**
 * Récupère toutes les affirmations stockées dans la table "affirmations".
 * 
 * @returns Un tableau d'affirmations avec leurs propriétés (id, libellé, points, etc.).
 * @throws Une erreur si la requête échoue.
 */
export const fetchAffirmations = async () => {
    const { data, error } = await supabase.from("affirmations").select("*");
    if (error) throw new Error(error.message);
    return data;
};

/**
 * Récupère la configuration des résultats diagnostiques depuis la table "diagnostic_results".
 * Chaque entrée indique une plage de scores (score_min à score_max) et un message associé.
 * 
 * @returns Un tableau de configurations des résultats.
 * @throws Une erreur si la requête échoue.
 */
export const fetchResultsConfig = async () => {
    const { data, error } = await supabase.from("diagnostic_results").select("*");
    if (error) throw new Error(error.message);
    return data;
};

/**
 * Récupère le rôle ("Admin" ou "User") de l'utilisateur actuellement connecté.
 * 
 * @returns Le rôle de l'utilisateur si disponible, sinon `null`.
 */
export const fetchUserRole = async (): Promise<"Admin" | "User" | null> => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;

    const { data: complement, error } = await supabase
        .from("userComplement")
        .select("role")
        .eq("id", auth.user.id)
        .single();

    if (error) return null;
    return complement?.role || null;
};
