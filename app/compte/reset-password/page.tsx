'use client';

import { useResetPasswordController } from './controller';

export default function ResetPassordPage() {
    const {
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        canReset,
        handleReset
    } = useResetPasswordController();

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
    );
}
