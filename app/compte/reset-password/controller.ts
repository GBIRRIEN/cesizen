'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { showErrorToast, showSuccessToast, updatePassword, checkUserSession } from '@/app/compte/reset-password/service';

export function useResetPasswordController() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [canReset, setCanReset] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            const isValid = await checkUserSession();
            if (!isValid) {
                showErrorToast("Lien invalide ou expiré.");
                router.push("/");
            } else {
                setCanReset(true);
            }
        };

        verifyUser();
    }, [router]);

    const handleReset = async () => {
        if (newPassword.length < 6) {
            showErrorToast("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        if (newPassword !== confirmPassword) {
            showErrorToast("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        const error = await updatePassword(newPassword);

        if (error) {
            showErrorToast("Erreur lors de la mise à jour du mot de passe.", error.message);
        } else {
            showSuccessToast("Mot de passe mis à jour !");
            router.push("/");
        }
        setLoading(false);
    };

    return {
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        canReset,
        handleReset
    };
}
