"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { toast } from 'sonner';
import { supabase } from "@/lib/supabase";

export default function GestionCompte() {
    const [user, setUser] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [form, setForm] = useState({ nom: '', prenom: '', email: '' });
    const [initialForm, setInitialForm] = useState({ nom: '', prenom: '', email: ''});
    const [confirmationEmail, setConfirmationEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return;
            }

            setUser(user);

            const { data, error } = await supabase
                .from("userComplement")
                .select("*")
                .eq("id", user.id)
                .single();
            
            if (!error && data) {
                setUserInfo(data);
                setForm({ nom: data.nom, prenom: data.prenom, email: user.email ?? "" });
                setInitialForm({ nom: data.nom, prenom: data.prenom, email: user.email ?? "" });
            }
        }

        fetchUserInfo();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const hasChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

    const handleSave = async () => {
        if (!user) {
            return;
        }

        const { error } = await supabase
            .from("userComplement")
            .update({ nom: form.nom, prenom: form.prenom })
            .eq("id", user.id);

        if (!error && form.email !== user.email) {
            await supabase.auth.updateUser({ email: form.email });
        }

        setInitialForm(form);
        toast.success("Modifications enregistrées");
    }

    const handleDeleteAccount = async () => {
        if (!user) {
            return;
        }

        if (confirmationEmail !== user.email) {
            alert("L'adresse email ne correspond pas.");
            return;
        }

        await supabase
            .from("userComplement")
            .delete()
            .eq("id", user.id)
        
        const res = await fetch("/api/delete-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user.id})
        });

        if (!res.ok) {
            toast.error("Erreur lors de la suppresion du compte.");
            return;
        }

        await supabase.auth.signOut();
        toast.success("Votre compte a bien été supprimé. À bientôt !");
        router.push("/");
    }

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
    )
}