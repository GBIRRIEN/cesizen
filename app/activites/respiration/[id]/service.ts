import { supabase } from "@/lib/supabase";
import type { ExerciceRespiration, ExerciceRespirationRaw } from "@/types";

export const fetchExerciceById = async (id: string): Promise<ExerciceRespiration | null> => {
    const { data, error } = await supabase
        .from("exercice_respiration")
        .select("*")
        .eq("id", id)
        .single<ExerciceRespirationRaw>();

    if (error || !data) {
        console.error("Erreur lors du chargement de l'exercice :", error.message);
        return null;
    }

    if (
        data.inspiration === null ||
        data.apnee === null ||
        data.expiration === null
    ) {
        console.error("Champs null dans l'exercice :", data);
        return null;
    }

    return {
        id: data.id,
        inspiration: data.inspiration,
        apnee: data.apnee,
        expiration: data.expiration
    };
};
