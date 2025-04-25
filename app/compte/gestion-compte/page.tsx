// compte/gestion-compte/page.tsx
"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useGestionCompteController } from "./controller";

export default function GestionCompte() {
  const {
    userInfo,
    form,
    confirmationEmail,
    setConfirmationEmail,
    handleChange,
    handleSave,
    handleDeleteAccount,
    hasChanged
  } = useGestionCompteController();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Information du compte</h2>

      {userInfo && (
        <div className="text-gray-600 space-y-2 mb-8">
          <p><strong>Nom :</strong> {userInfo.nom}</p>
          <p><strong>Prénom :</strong> {userInfo.prenom}</p>
          <p><strong>Date d'inscription :</strong> {new Date(userInfo.created_at).toLocaleDateString()}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
        <Input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

        <Button onClick={handleSave} disabled={!hasChanged} className="mt-4">
          Enregistrer les modifications
        </Button>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-red-600 font-semibold mb-2">Désactiver mon compte</h3>
        <p className="text-sm text-gray-500 mb-2">
          Cette action est définitive. Pour confirmer, entrez votre adresse email :
        </p>
        <Input
          value={confirmationEmail}
          onChange={(e) => setConfirmationEmail(e.target.value)}
          placeholder="Confirmer votre email"
        />
        <Button variant="destructive" onClick={handleDeleteAccount} className="mt-4">
          Désactiver mon compte
        </Button>
      </div>
    </div>
  );
}
