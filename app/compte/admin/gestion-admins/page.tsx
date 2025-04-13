"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function GestionAdmin() {
    const [admins, setAdmins] = useState<any[]>([]);
    const [form, setForm] = useState({ email: "", password: "", nom: "", prenom: ""});
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchAdmins = async () => {
            const { data: userComplements } = await supabase
                .from("userComplement")
                .select("*")
                .eq("role", "Admin");
            
            const response = await fetch("/api/get-admins", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: userComplements?.map((u) => u.id )})
            });

            const { users } = await response.json();

            const merged = userComplements?.map((u) => ({
                ...u,
                email: users?.find((authUser: any) => authUser.id === u.id)?.email || "Email introuvable"
            })) || [];

            setAdmins(merged);
        };

        fetchAdmins();
    }, []);

    const handleCreateAdmin = async () => {
        const { email, password, nom, prenom } = form;

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error || !data.user) {
            toast.error("Erreur lors de la création du compte.");
            return;
        }

        const { error: complementError } = await supabase
            .from("userComplement")
            .insert({
                id: data.user.id,
                nom,
                prenom,
                role: "Admin"
            });

        if (complementError) {
            toast.error("Erreur lors de l'ajout des infos complémentaires.");
            return;
        }

        toast.success("Compte administrateur créé avec succès !");
        setOpen(false);
        setForm({ email: "", password: "", nom: "", prenom: ""});

        location.reload();
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestion des comptes administrateurs</h1>
            <div className="flex justify-center">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">Créer un compte administrateur</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nouveau compte administrateur</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input placeholder="Nom" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                            <Input placeholder="Prénom" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} />
                            <Input placeholder="Adresse email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value})} />
                            <Input placeholder="Mot de passe" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                            <Button className="w-full" onClick={handleCreateAdmin}>Créer</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid gap-4">
                {admins.map((admin) => (
                    <Card key={admin.id} className="flex justify-between items-center p-4">
                        <CardContent className="p-0 flex-1">
                            <p className="font-semibold">{admin.nom} {admin.prenom}</p>
                            <p className="text-sm text-gray-600">{admin.email}</p>
                        </CardContent>
                        <Button className="cursor-pointer" onClick={() => router.push(`/compte/admin/gestion-compte/${admin.id}`)}>Gestion du compte</Button>
                    </Card>
                ))}
            </div>
        </div>
    )
}