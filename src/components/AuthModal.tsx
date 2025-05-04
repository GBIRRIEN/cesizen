"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setNom("");
    setPrenom("");
    setEmail("");
    setPassword("");
  }, [isLoginMode]);

  useEffect(() => {
    if (!isOpen) {
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="auth-modal relative bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <X size={24} />
        </button>

        {!showResetPassword ? (
          <>
            <div className="flex justify-center mb-4">
              <button onClick={() => setIsLoginMode(true)} className={`px-4 py-2 rounded-l-lg ${isLoginMode ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                Se connecter
              </button>
              <button onClick={() => setIsLoginMode(false)} className={`px-4 py-2 rounded-r-lg ${!isLoginMode ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                Créer un compte
              </button>
            </div>

            {errorMessage && <p className="text-red-500 text-center mb-2">{errorMessage}</p>}

            <form 
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setErrorMessage("");
                setSuccessMessage("");

                if (isLoginMode) {
                  const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                  });

                  if (error) {
                    setErrorMessage("Email ou mot de passe incorrect.");
                  } else {
                    toast.success("Connexion réussie !", {
                      description: `Bienvenue ${email} !`,
                    });
                    setSuccessMessage("Connexion réussie !");
                    onClose();
                    setTimeout(() => {
                      router.refresh();
                    }, 300)
                  }
                } else {
                  const { data: { user }, error: signupError } = await supabase.auth.signUp({
                    email,
                    password
                  });

                  if (signupError) {
                    setErrorMessage(signupError.message);
                  } else if (user) {
                    const { error: complementError } = await supabase
                      .from("userComplement")
                      .insert([
                        {
                          id: user.id,
                          nom,
                          prenom,
                          role: "User"
                        }
                      ]);

                      if (complementError) {
                        setErrorMessage("Erreur lors de la création du complément utilisateur.");
                        toast.error("Erreur lors de la création du complément utilisateur.");
                      } else {
                        setSuccessMessage("Compte créé ! Vérifie ta boîte mail pour valider ton adresse.");
                        setIsLoginMode(true);
                      }
                  }
                }

                setLoading(false);
              }}
            >
              {!isLoginMode && (
                <>
                  <input type="text" placeholder="Nom" className="w-full p-2 border rounded-md" value={nom} onChange={(e) => setNom(e.target.value)}/>
                  <input type="text" placeholder="Prénom" className="w-full p-2 border rounded-md" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                </>
              )}
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50" disabled={loading}>
                { loading ? "Chargement..." : isLoginMode ? "Se connecter" : "S'inscrire"}
              </button>
              {isLoginMode && !showResetPassword && (
                <button type="button" onClick={() => setShowResetPassword(true)} className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </button>
              )}
            </form>
            {successMessage && (
              <p className="mt-4 text-green-600">{successMessage}</p>
            )}
          </>
        ) : (
          <div className="mt-4 space-y-2">
            <h3 className="text-center font-semibold text-gray-700">Réinitialisation du mot de passe</h3>
            <input 
              type="email"
              placeholder="Ton email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={async () => {
                setLoading(true);
                setResetSuccess(false);
                const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
                  redirectTo: `${window.location.origin}/compte/reset-password`
                });

                if (error) {
                  toast.error("Erreur lors de l'envoi du lien", { description: error.message});
                } else {
                  toast.success("Mail envoyé !", { description: "Vérifie ta boîte mail."});
                  setResetSuccess(true);
                }

                setLoading(false);
              }}
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
            {resetSuccess && (
              <p className="text-green-600 text-center">Email de réinitialisation envoyé !</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}