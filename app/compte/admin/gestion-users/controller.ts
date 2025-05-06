"use server";

import { fetchUsersService, deleteUserService } from "./service";

export const fetchUsersController = async () => {
  try {
    return await fetchUsersService();
  } catch (error) {
    return null;
  }
};

export const deleteUserController = async (userId: string) => {
  try {
    const success = await deleteUserService(userId);
    return success
  } catch (error) {
    return false;
  }
};
