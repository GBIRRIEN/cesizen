"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function GestionCompteAdmin() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({ nom: "", prenom: "", email: "" });
    const [initialForm, setInitialForm] = useState({ nom: "", prenom: "", email: "" });
    const [confirmationEmail, setConfirmationEmail] = useState("");

    useEffect(() => {
        const fetchAdminInfo = async () => {
            if (!id || typeof id !== "string") return;

            const res = await fetch("/api/get-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
    
            if (!res.ok) {
                toast.error("Impossible de charger les données du compte.");
                router.push("/compte/admin/gestion-admins");
                return;
            }
    
            const admin = await res.json();
            setForm({ nom: admin.nom, prenom: admin.prenom, email: admin.email });
            setInitialForm({ nom: admin.nom, prenom: admin.prenom, email: admin.email });
        };

        fetchAdminInfo();
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const hasChanged = form.nom !== initialForm.nom || form.prenom !== initialForm.prenom;

    const handleSave = async () => {
        if (typeof id !== "string") return;

        await supabase
            .from("userComplement")
            .update({ nom: form.nom, prenom: form.prenom })
            .eq("id", id);

        setInitialForm({ ...form});
        toast.success("Modifications enregistrées");
    };

    const handleDelete = async () => {
        if (typeof id !== "string") return;

        if (confirmationEmail !== form.email) {
            toast.error("Email de confirmation incorrect");
            return;
        }

        await supabase.from("userComplement").delete().eq("id", id);

        await fetch("/api/delete-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id })
        });

        toast.success("Compte supprimé");
        router.push("/compte/admin/gestion-admins");
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
