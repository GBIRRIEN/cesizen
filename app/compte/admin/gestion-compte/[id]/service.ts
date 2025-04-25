"use server";

import { supabase } from "@/lib/supabase";

export const fetchAdminInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("userComplement")
    .select("nom, prenom, email")
    .eq("id", id)
    .single();

  if (error) throw new Error("Erreur de récupération de l'administrateur");
  return data;
};

export const updateAdmin = async (id: string, nom: string, prenom: string) => {
  const { error } = await supabase
    .from("userComplement")
    .update({ nom, prenom })
    .eq("id", id);

  if (error) throw new Error("Erreur de mise à jour de l'administrateur");
};

export const deleteAdmin = async (id: string) => {
  const { error: deleteComplementError } = await supabase
    .from("userComplement")
    .delete()
    .eq("id", id);

  const res = await fetch("/api/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: id })
  });

  if (!res.ok || deleteComplementError) throw new Error("Erreur de suppression");
};
