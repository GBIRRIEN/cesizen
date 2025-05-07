// service.ts
import { supabase } from "@/lib/supabase";
import { UserComplement } from "@/types";

export async function getAdminUserComplements(): Promise<UserComplement[] | null> {
    const { data, error } = await supabase
        .from("userComplement")
        .select("*")
        .eq("role", "Admin");

    if (error || !data) return null;
    return data;
}

export async function registerAdminUser(form: { email: string; password: string; nom: string; prenom: string; }) {
    const { email, password, nom, prenom } = form;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
        console.error("SignUp error :", error);
        return { 
            success: false, 
            message: error?.message || "Erreur lors de la création du compte." };
    }

    const { error: complementError } = await supabase
        .from("userComplement")
        .insert({ id: data.user.id, nom, prenom, role: "Admin" });

    if (complementError) {
        return { success: false, message: "Erreur lors de l'ajout des infos complémentaires." };
    }

    return { success: true, message: "Compte créé." };
}