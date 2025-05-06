"use client";

import Link from "next/link";
import {
    Card,
    CardContent,
} from "@/src/components/ui/card";
import {
    BookmarkCheck,
    SquareUserRound,
    ShieldCheck,
    Users,
    Newspaper,
} from "lucide-react";
import { useCompteController } from "./controller";

export default function Compte() {
    const { userNom, userPrenom, isAdmin, handleLogout } = useCompteController();
    
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
                    <hr className="w-full border-gray-300 my-8" />
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
    );
}
