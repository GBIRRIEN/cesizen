"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  fetchUserComplement,
  updateUserComplement,
  deleteUserComplement,
  deleteUserFromServer
} from "@/app/compte/gestion-compte/service";

export function useGestionCompteController() {
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' });
  const [initialForm, setInitialForm] = useState({ nom: '', prenom: '', email: '' });
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { user, complement } = await fetchUserComplement();
      if (!user || !complement) return;

      setUser(user);
      setUserInfo(complement);
      setForm({ nom: complement.nom, prenom: complement.prenom, email: user.email ?? "" });
      setInitialForm({ nom: complement.nom, prenom: complement.prenom, email: user.email ?? "" });
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const hasChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    if (!user) return;

    await updateUserComplement(user.id, form.nom, form.prenom);

    setInitialForm(form);
    toast.success("Modifications enregistrées");
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (confirmationEmail !== user.email) {
      toast.error("L'adresse email ne correspond pas.");
      return;
    }

    await deleteUserComplement(user.id);

    const res = await deleteUserFromServer(user.id);
    if (!res.ok) {
      toast.error("Erreur lors de la suppression du compte.");
      return;
    }

    toast.success("Votre compte a bien été supprimé. À bientôt !");
    router.push("/");
  };

  return {
    userInfo,
    form,
    confirmationEmail,
    setConfirmationEmail,
    handleChange,
    handleSave,
    handleDeleteAccount,
    hasChanged
  };
}
