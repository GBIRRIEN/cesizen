import { supabase } from "@/lib/supabase";
import { Affirmation } from "@/types";

export const fetchAffirmations = async (): Promise<Affirmation[]> => {
    const { data, error } = await supabase.from("affirmations").select("*").order("id");
    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};

export const addAffirmation = async (libelle: string, points: number): Promise<void> => {
    const { error } = await supabase.from("affirmations").insert({ libelle, points });
    if (error) {
        throw new Error(error.message);
    }
};

export const updateAffirmation = async (id: number, libelle: string, points: number): Promise<void> => {
    const { error } = await supabase.from("affirmations").update({ libelle, points }).eq("id", id);
    if (error) {
        throw new Error(error.message);
    }
};

export const deleteAffirmation = async (id: number): Promise<void> => {
    const { error } = await supabase.from("affirmations").delete().eq("id", id);
    if (error) {
        throw new Error(error.message);
    }
};
