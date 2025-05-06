"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  fetchAdminController,
  updateAdminController,
  deleteAdminController
} from "./controller";
import { toast } from "sonner";

export default function GestionCompteAdmin() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({ nom: "", prenom: "", email: "" });
  const [initialForm, setInitialForm] = useState({ nom: "", prenom: "", email: "" });
  const [confirmationEmail, setConfirmationEmail] = useState("");

  useEffect(() => {
    console.log("ID reçu dans useEffect:", id);

    const fetchData = async () => {
      if (!id || typeof id !== "string") return;

      const admin = await fetchAdminController(id);
      console.log("Admin: ", admin);

      if (!admin) {
        toast.error("Impossible de charger les données du compte.");
        router.push("/compte/admin/gestion-admins");
        return;
      }

      setForm(admin);
      setInitialForm(admin);
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const hasChanged = form.nom !== initialForm.nom || form.prenom !== initialForm.prenom;

  const handleSave = async () => {
    if (typeof id !== "string") return;
    const res = await updateAdminController(id, form.nom, form.prenom);
    if (res.success) {
      toast.success("Modifications enregistrées");
      setInitialForm({ ...form });
    } else {
      toast.error("Erreur lors de la mise à jour du compte.");
    }
  };

  const handleDelete = async () => {
    if (typeof id !== "string") return;

    const res = await deleteAdminController(id, confirmationEmail, form.email);
    if (res.success) {
      toast.success("Compte supprimé");
      router.push("/compte/admin/gestion-admins");
    } else if (res.reason === "email-mismatch") {
      toast.error("Email de confirmation incorrect");
    } else {
      toast.error("Erreur lors de la suppression du compte.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Gestion du compte administrateur</h2>
      <Input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" />
      <Input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" />
      <Input name="email" value={form.email} disabled placeholder="Email" />
      <Button onClick={handleSave} disabled={!hasChanged}>Enregistrer</Button>

      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-red-600 mb-2">Supprimer le compte</h3>
        <Input
          placeholder="Confirmez l'adresse email"
          value={confirmationEmail}
          onChange={(e) => setConfirmationEmail(e.target.value)}
        />
        <Button onClick={handleDelete} variant="destructive" className="mt-2">Supprimer</Button>
      </div>
    </div>
  );
}
