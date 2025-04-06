"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Compte() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                router.push("/")
            } else {
                setUserEmail(data.user.email ?? null);
                setUserId(data.user.id ?? null);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error("Erreur lors de la déconnexion", {
                description: error.message
            });
        } else {
            toast.success("Déconnexion réussie");
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Espace Mon Compte</h1>
            {userEmail ? (
                <p className="text-gray-700">Connecté en tant que : <strong>{userEmail}</strong></p>
            ) : (
                <p className="text-gray-500">Chargement...</p>
            )}
            <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Se déconnecter
            </button>
        </div>
    )
}