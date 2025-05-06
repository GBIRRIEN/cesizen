"use server";

import { supabase } from "@/lib/supabase";

console.log("service chargé");

export const fetchAdminInfo = async (id: string) => {
  console.log("Id dans fetchAdminInfo :", id)

  const { data: complement, error: complementError } = await supabase
    .from("userComplement")
    .select("nom, prenom")
    .eq("id", id)
    .single();

  console.log("Résultat complement :", complement, "Erreur :", complementError);

  if (complementError) throw new Error("Erreur de récupération du complément d'info");

  const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(id);

  console.log("Résultat authUser:", authUser, "Erreur:", authError);

  if (authError || !authUser.user) throw new Error("Erreur de récupération de l'email");

  const email = authUser.user.email;

  if (!email) throw new Error("Email introuvable pour cet utilisateur");

  return {
    ...complement,
    email,
  };
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
