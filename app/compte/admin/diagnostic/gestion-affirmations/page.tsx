"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Trash2, Save } from "lucide-react";
import { toast } from "sonner";

type Affirmation = {
    id: number;
    libelle: string;
    points: number;
};

export default function GestionAffirmations() {
    const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
    const [libelle, setLibelle] = useState("");
    const [points, setPoints] = useState<number>(0);

    useEffect(() => {
        fetchAffirmations();
    }, []);

    const fetchAffirmations = async () => {
        const { data } = await supabase
            .from("affirmations")
            .select("*")
            .order("id");

        if (data) {
            setAffirmations(data);
        }
    };

    const addAffirmation = async () => {
        if (!libelle) {
            return;
        }

        await supabase
            .from("affirmations")
            .insert({ libelle, points });

        setLibelle("");
        setPoints(0);
        fetchAffirmations();
    };

    const updateAffirmation = async (id: number, libelle: string, points: number) => {
        await supabase
            .from("affirmations")
            .update({ libelle, points })
            .eq("id", id);

        toast.success("Modification enregistrées !");
        fetchAffirmations();
    };

    const deleteAffirmation = async (id: number) => {
        await supabase
            .from("affirmations")
            .delete()
            .eq("id", id);
        
        toast.success("Affirmations correctement supprimée !");
        fetchAffirmations();
    }

    return(
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
                            className="flex-1"
                            value={a.libelle}
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
                            value={a.points}
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
                                onClick={() => updateAffirmation(a.id, a.libelle, a.points)}
                                size="icon"
                            >
                                <Save className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => deleteAffirmation(a.id)}
                            >
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}