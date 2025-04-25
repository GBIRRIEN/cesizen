import { supabase } from "@/lib/supabase";

export const getUserAuth = async () => {
    return await supabase.auth.getUser();
};

export const getUserComplement = async (userId: string) => {
    return await supabase
        .from("userComplement")
        .select("*")
        .eq("id", userId)
        .single();
};

export const signOut = async () => {
    return await supabase.auth.signOut();
};
