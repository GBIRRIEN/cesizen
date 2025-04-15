"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Exercice = {
    id: string;
    inspiration: number;
    apnee: number;
    expiration: number;
};

export default function Respiration() {
    const router = useRouter();
    const [exercices, setExercices] = useState<Exercice[]>([]);

    useEffect(() => {
        fetchExercices();
    }, []);

    const fetchExercices = async () => {
        const { data, error } = await supabase
            .from("exercice_respiration")
            .select("id, inspiration, apnee, expiration")
            .order("id");

        if (error) {
            console.error("Erreur lors du chargement des exercices :", error.message);
            return;
        }

        if (data) {
            setExercices(data);
        }
    };

    const handleChoice = (exerciceId: string) => {
        router.push(`/activites/respiration/${exerciceId}`);
    };

    return(
        <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Choisissez un exercice de respiration</h2>
            {exercices.map((ex) => (
                <Card key={ex.id}>
                    <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-lg font-medium">Exercices {ex.id}</p>
                            <p className="text-sm text-muted-foreground">
                                Inspiration : {ex.inspiration}s · Apnée : {ex.apnee}s · Expiration : {ex.expiration}s
                            </p>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleChoice(ex.id)}>Choisir</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}