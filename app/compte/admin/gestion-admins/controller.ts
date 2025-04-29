"use server";

import { getAdminUserComplements, registerAdminUser } from "./service";
import { FullUser } from "@/types";

export async function fetchAdmins(): Promise<FullUser[]> {
    const userComplements = await getAdminUserComplements();
    if (!userComplements) return [];

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/get-admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: userComplements.map((u) => u.id) }),
        cache: "no-store"
    });

    const { users } = await response.json();

    const merged: FullUser[] = userComplements.map((u) => ({
        ...u,
        email: users?.find((authUser: any) => authUser.id === u.id)?.email || null
    }));

    return merged;
}

export async function createAdmin(form: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
}): Promise<{ success: boolean; message: string }> {
    return await registerAdminUser(form);
}
