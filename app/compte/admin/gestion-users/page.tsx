"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/src/components/ui/input";

type User = {
    id: string;
    nom: string;
    prenom: string;
    email: string;
}

export default function GestionUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/get-users", {
                method: "GET"
            });

            if (!res.ok) {
                toast.error("Erreur lors du chargement des utilisateurs.");
                return;
            }

            const data = await res.json();
            setUsers(data.users);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (user: User) => {
        const confirmed = window.confirm(`Confirmez-vous la suppression du compte de ${user.prenom} ${user.nom} ? Cette action est irréversible.`);

        if (!confirmed) {
            return;
        }

        const res = await fetch("/api/delete-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id })
        });

        if (res.ok) {
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            toast.success("Compte supprimé avec succès");
        } else {
            toast.error("Erreur lors de la suppression.");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Gestion des comptes utilisateurs</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {users.map((user) => (
                    <Card key={user.id} className="p-4 flex flex-col gap-2">
                        <CardContent className="p-0 flex-1">
                            <p className="font-semibold">{user.nom} {user.prenom}</p>
                            <p className="text-sm text-gray-600 break-all">{user.email}</p>
                        </CardContent>
                        <Button variant="destructive" onClick={() => handleDelete(user)} className="mt-2">
                            Supprimer le compte
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}