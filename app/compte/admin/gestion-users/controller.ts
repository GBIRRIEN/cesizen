"use server";

import { fetchUsersService, deleteUserService } from "./service";
import { toast } from "sonner";

export const fetchUsersController = async () => {
  try {
    const users = await fetchUsersService();
    return users;
  } catch (error) {
    toast.error("Erreur lors du chargement des utilisateurs.");
    return null;
  }
};

export const deleteUserController = async (userId: string) => {
  try {
    const success = await deleteUserService(userId);
    if (success) {
      toast.success("Compte supprimé avec succès");
      return true;
    } else {
      throw new Error();
    }
  } catch (error) {
    toast.error("Erreur lors de la suppression.");
    return false;
  }
};
