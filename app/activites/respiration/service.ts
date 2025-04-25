import { supabase } from "@/lib/supabase";
import { ExerciceRespiration } from "@/types"; // adapte si nécessaire

export const fetchExercices = async (): Promise<ExerciceRespiration[]> => {
    const { data, error } = await supabase
        .from("exercice_respiration")
        .select("*")
        .order("id");

    if (error) {
        console.error("Erreur lors du chargement des exercices :", error.message);
        return [];
    }

    return data ?? [];
};
