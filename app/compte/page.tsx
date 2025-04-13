"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/src/components/ui/card"
import { BookmarkCheck, SquareUserRound, ShieldCheck, Users, Newspaper } from "lucide-react";

export default function Compte() {
    const router = useRouter();
    const [userNom, setUserNom] = useState<string | null>(null);
    const [userPrenom, setUserPrenom] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                router.push("/")
            } else {
                const user = data.user
                setUserId(data.user.id ?? null);

                const { data: userComplement, error: complementError } = await supabase
                    .from("userComplement")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                setUserNom(userComplement.nom ?? null);
                setUserPrenom(userComplement.prenom ?? null);

                if (!complementError && userComplement?.role === "Admin") {
                    setIsAdmin(true);
                }
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error("Erreur lors de la déconnexion", {
                description: error.message
            });
        } else {
            toast.success("Déconnexion réussie");
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32 space-y-8 px-4">
            <h1 className="text-2xl font-bold">Espace Mon Compte</h1>
            {userNom && userPrenom ? (
                <p className="text-gray-700">Bonjour <strong>{userPrenom} {userNom}</strong> !</p>
            ) : (
                <p className="text-gray-500">Chargement...</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <Link href="/compte/gestion-compte">
                    <Card className="cursor-pointer hover:shadow-lg transition p-6 text-center">
                        <CardContent className="flex flex-col items-center space-y-2 pt-4">
                            <SquareUserRound size={36} />
                            <span className="text-lg font-semibold">Gérer mon compte</span>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/compte/articles-saves">
                    <Card className="cursor-pointer hover:shadow-lg transition p-6 text-center">
                        <CardContent className="flex flex-col items-center space-y-2 pt-4">
                            <BookmarkCheck size={36} />
                            <span className="text-lg font-semibold">Articles enregistrés</span>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            {isAdmin && (
                <>
                    <hr className="w-full border-gray-300 my-8"/>
                    <h2 className="text-xl font-semibold">Espace Admin</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        <Card className="cursor-pointer hover:shadow-lg transition p-6 text-center">
                            <Link href="/compte/admin/gestion-admins">
                                <CardContent className="flex flex-col items-center space-y-2 pt-4">
                                    <ShieldCheck size={36} />
                                    <span className="text-lg font-semibold">Gérer les admins</span>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card className="cursor-pointer hover:shadow-lg transition p-6 text-center">
                            <Link href="/compte/admin/gestion-users">
                                <CardContent className="flex flex-col items-center space-y-2 pt-4">
                                    <Users size={36} />
                                    <span className="text-lg font-semibold">Gérer les utilisateurs</span>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card className="cursor-pointer hover:shadow-lg transition p-6 text-center">
                            <Link href="/compte/admin/gestion-articles">
                                <CardContent className="flex flex-col items-center space-y-2 pt-4">
                                    <Newspaper size={36} />
                                    <span className="text-lg font-semibold">Gérer les articles</span>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
                </>
            )}
            <button onClick={handleLogout} className="px-6 py-2 mb-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Se déconnecter
            </button>
        </div>
    )
}