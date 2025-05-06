import { supabase } from "@/lib/supabase";

export async function fetchUserComplement() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, complement: null };

  const { data, error } = await supabase
    .from("userComplement")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return { user, complement: null };

  return { user, complement: data };
}

export async function updateUserComplement(userId: string, form: any) {
  const { error } = await supabase
    .from("userComplement")
    .update({ nom: form.nom, prenom: form.prenom })
    .eq("id", userId);

  return error;
}

export async function deleteUserComplement(userId: string) {
  await supabase
    .from("userComplement")
    .delete()
    .eq("id", userId);
}

export async function deleteUserFromServer(userId: string) {
  return await fetch("/api/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  });
}

export async function signOutUser() {
  await supabase.auth.signOut();
}
