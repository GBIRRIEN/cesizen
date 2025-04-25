"use server";

import { fetchAdminInfo, updateAdmin, deleteAdmin } from "./service";
import { toast } from "sonner";

export const fetchAdminController = async (id: string) => {
  try {
    const admin = await fetchAdminInfo(id);
    if (!admin) throw new Error("Admin non trouvé");
    return admin;
  } catch (error) {
    toast.error("Impossible de charger les données du compte.");
    return null;
  }
};

export const updateAdminController = async (id: string, nom: string, prenom: string) => {
  try {
    await updateAdmin(id, nom, prenom);
    toast.success("Modifications enregistrées");
  } catch (error) {
    toast.error("Erreur lors de la mise à jour du compte.");
  }
};

export const deleteAdminController = async (
  id: string,
  emailConfirmation: string,
  actualEmail: string
) => {
  if (emailConfirmation !== actualEmail) {
    toast.error("Email de confirmation incorrect");
    return false;
  }

  try {
    await deleteAdmin(id);
    toast.success("Compte supprimé");
    return true;
  } catch (error) {
    toast.error("Erreur lors de la suppression du compte.");
    return false;
  }
};
