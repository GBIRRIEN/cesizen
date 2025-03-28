"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        password
      })
    });
  
    const data = await response.json();
    alert(data.message);
  }

  const handleLogin = async (e : React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue lors de la connexion.");
    }
  }

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <X size={24} />
        </button>
        <div className="flex justify-center mb-4">
          <button onClick={() => setIsLoginMode(false)} className={`px-4 py-2 rounded-l-lg ${!isLoginMode ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}>
            Se connecter
          </button>
          <button onClick={() => setIsLoginMode(true)} className={`px-4 py-2 rounded-r-lg ${isLoginMode ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}>
            Créer un compte
          </button>
        </div>
        {isLoginMode ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <input type="text" placeholder="Nom" className="w-full p-2 border rounded-md" onChange={(nom) => setNom(nom.target.value)} />
            <input type="text" placeholder="Prénom" className="w-full p-2 border rounded-md" onChange={(prenom) => setPrenom(prenom.target.value)} />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" onChange={(email) => setEmail(email.target.value)}/>
            <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded-md" onChange={(password) => setPassword(password.target.value)}/>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">S'inscrire</button>
          </form>
        ) : (
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
            <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded-md" />
            <p className="text-xs text-gray-500">
              Pas encore de compte ?
              <button type="button" onClick={() => setIsLoginMode(true)} className="text-green-600 cursor-pointer ml-2">
                Créer un compte
              </button>
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">Se connecter</button>
          </form>
        )}
      </div>
    </div>
  );
}
