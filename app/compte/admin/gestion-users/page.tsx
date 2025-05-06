"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { fetchUsersController, deleteUserController } from "./controller";
import { FullUser } from "@/types";
import { toast } from "sonner";

export default function GestionUsers() {
    const [users, setUsers] = useState<FullUser[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsersController();
            if (data) {
                setUsers(data);
            } else {
                toast.error("Erreur lors du chargement des utilisateurs.");
            }
        };
        loadUsers();
    }, []);

    const handleDelete = async (user: FullUser) => {
        const confirmed = window.confirm(`Confirmez-vous la suppression du compte de ${user.prenom} ${user.nom} ? Cette action est irréversible.`);
        if (!confirmed) return;

        const success = await deleteUserController(user.id);
        if (success) {
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
