'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ResetPassordPage() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [canReset, setCanReset] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (data.user && !error) {
                setCanReset(true);
            } else {
                toast.error("Lien invalide ou expiré.");
                router.push("/");
            }
        };

        checkSession();
    }, [router]);

    const handleReset = async () => {
        if (newPassword.length < 6) {
            toast.error("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        } 

        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            toast.error("Erreur lors de la mise à jour du mot de passe.", {
                description: error.message
            });
        } else {
            toast.success("Mot de passe mis à jour !");
            router.push("/");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Réinitialisation du mot de passe</h1>
                {canReset ? (
                    <div className="space-y-4">
                        <input 
                            type="password"
                            placeholder="Nouveau mot de passe"
                            className="w-full p-2 border rounded-md"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input 
                            type="password"
                            placeholder="Confirmer le nouveau mot de passe"
                            className="w-full p-2 border rounded-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={handleReset}
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? "Chargement..." : "Réinitialiser le mot de passe"}
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Vérification du lien...</p>
                )}
            </div>
        </div>
    )
}