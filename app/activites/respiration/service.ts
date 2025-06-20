import { supabase } from "@/lib/supabase";
import { ExerciceRespiration } from "@/types"; // adapte si nécessaire

// Fonction asynchrone pour récupérer tous les exercices de respiration depuis la base de données Supabase
export const fetchExercices = async (): Promise<ExerciceRespiration[]> => {
    const { data, error } = await supabase
        .from("exercice_respiration")
        .select("*")
        .order("id");

    if (error) {
        console.error("Erreur lors du chargement des exercices :", error.message);
        return [];
    }

    // Si pas d'erreur, retourne les données ou un tableau vide si null
    return data ?? [];
};
