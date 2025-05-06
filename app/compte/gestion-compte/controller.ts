"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  fetchUserComplement,
  updateUserComplement,
  deleteUserComplement,
  deleteUserFromServer,
  signOutUser
} from "@/app/compte/gestion-compte/service";

export function useGestionCompteController() {
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' });
  const [initialForm, setInitialForm] = useState({ nom: '', prenom: '', email: '' });
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const router = useRouter();

  const loadUserData = async () => {
    const { user, complement } = await fetchUserComplement();
    if (!user || !complement) return;

    setUser(user);
    setUserInfo(complement);
    const newForm = {
      nom: complement.nom,
      prenom: complement.prenom,
      email: user.email ?? ""
    };
    setForm(newForm);
    setInitialForm(newForm);
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const hasChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    if (!user) return;

    await updateUserComplement(user.id, form);
    toast.success("Modifications enregistrées");

    await loadUserData();
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
    signOutUser();
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
