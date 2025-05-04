// @/app/compte/admin/diagnostic/gestion-affirmations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Trash2, Save } from "lucide-react";
import { handleFetchAffirmations, handleAddAffirmation, handleUpdateAffirmation, handleDeleteAffirmation } from "@/app/compte/admin/diagnostic/gestion-affirmations/controller";
import { Affirmation } from "@/types";

export default function GestionAffirmations() {
    const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
    const [libelle, setLibelle] = useState("");
    const [points, setPoints] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await handleFetchAffirmations();
            setAffirmations(data);
        };

        fetchData();
    }, []);

    const addAffirmation = () => {
        if (!libelle) return;
        handleAddAffirmation(libelle, points);
        setLibelle("");
        setPoints(0);
        const fetchData = async () => {
            const data = await handleFetchAffirmations();
            setAffirmations(data);
        };
        fetchData();
    };

    const updateAffirmation = (id: number, libelle: string, points: number) => {
        handleUpdateAffirmation(id, libelle, points);
        const fetchData = async () => {
            const data = await handleFetchAffirmations();
            setAffirmations(data);
        };
        fetchData();
    };

    const deleteAffirmation = (id: number) => {
        handleDeleteAffirmation(id);
        const fetchData = async () => {
            const data = await handleFetchAffirmations();
            setAffirmations(data);
        };
        fetchData();
    };

    return (
        <div className="px-6 py-8 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold">Gestion des affirmations</h2>
            <div className="flex gap-2">
                <Input
                    placeholder="Nouvelle affirmation"
                    value={libelle}
                    onChange={(e) => setLibelle(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Points"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                />
                <Button className="bg-green-500 hover:bg-green-600" onClick={addAffirmation}>Ajouter</Button>
            </div>
            {affirmations.map((a) => (
                <Card key={a.id}>
                    <CardContent className="flex flex-col md:flex-row items-center gap-2 p-4">
                        <Input
                            data-testid={`affirmation-libelle-${encodeURIComponent(a.libelle ?? "")}`}
                            className="flex-1"
                            value={a.libelle ?? ""}
                            onChange={(e) =>
                                setAffirmations((prev) =>
                                    prev.map((item) =>
                                        item.id === a.id ? { ...item, libelle: e.target.value } : item
                                    )
                                )
                            }
                        />
                        <Input
                            type="number"
                            className="w-20"
                            value={a.points ?? ""}
                            onChange={(e) =>
                                setAffirmations((prev) =>
                                    prev.map((item) =>
                                        item.id === a.id ? { ...item, points: Number(e.target.value) } : item
                                    )
                                )
                            }
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="default"
                                className="bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => updateAffirmation(a.id, a.libelle ?? "", a.points ?? 0)}
                                size="icon"
                            >
                                <Save className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => deleteAffirmation(a.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
