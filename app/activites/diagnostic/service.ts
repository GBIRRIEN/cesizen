import { supabase } from "@/lib/supabase";

export const fetchAffirmations = async () => {
    const { data, error } = await supabase.from("affirmations").select("*");
    if (error) throw new Error(error.message);
    return data;
};

export const fetchResultsConfig = async () => {
    const { data, error } = await supabase.from("diagnostic_results").select("*");
    if (error) throw new Error(error.message);
    return data;
};

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
