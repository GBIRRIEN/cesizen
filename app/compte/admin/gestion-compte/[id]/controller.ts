"use server";

import { fetchAdminInfo, updateAdmin, deleteAdmin } from "./service";

console.log("contoller chargé");

export const fetchAdminController = async (id: string) => {
  try {
    const admin = await fetchAdminInfo(id);
    console.log("✅ fetchAdminController admin trouvé:", admin);
    return admin;
  } catch (error) {
    console.error("Erreur dans fetchAdminController :", error);
    return null;
  }
};

export const updateAdminController = async (id: string, nom: string, prenom: string) => {
  try {
    await updateAdmin(id, nom, prenom);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const deleteAdminController = async (
  id: string,
  emailConfirmation: string,
  actualEmail: string
) => {
  if (emailConfirmation !== actualEmail) {
    return { success: false, reason: "email-mismatch" };
  }

  try {
    await deleteAdmin(id);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
