"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUserAuth, getUserComplement, signOut } from "./service";

export const useCompteController = () => {
    const router = useRouter();

    const [userNom, setUserNom] = useState<string | null>(null);
    const [userPrenom, setUserPrenom] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await getUserAuth();

            if (error || !data.user) {
                router.push("/");
                return;
            }

            const user = data.user;
            setUserId(user.id);

            const { data: userComplement, error: complementError } = await getUserComplement(user.id);

            if (userComplement) {
                setUserNom(userComplement.nom ?? null);
                setUserPrenom(userComplement.prenom ?? null);
                if (userComplement.role === "Admin") {
                    setIsAdmin(true);
                }
            }

            if (complementError) {
                console.error("Erreur complément utilisateur", complementError);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await signOut();

        if (error) {
            toast.error("Erreur lors de la déconnexion", {
                description: error.message,
            });
        } else {
            toast.success("Déconnexion réussie");
            router.push("/");
        }
    };

    return {
        userNom,
        userPrenom,
        isAdmin,
        handleLogout,
    };
};
