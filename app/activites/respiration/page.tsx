"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { fetchExercices } from "./service";
import { useExerciceNavigator } from "./controller";
import { ExerciceRespiration } from "@/types";

export default function Respiration() {
    const [exercices, setExercices] = useState<ExerciceRespiration[]>([]);
    const { navigateToExercice } = useExerciceNavigator();

    useEffect(() => {
        const load = async () => {
            const data = await fetchExercices();
            setExercices(data);
        };
        load();
    }, []);

    return (
        <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">Choisissez un exercice de respiration</h2>
            {exercices.map((ex) => (
                <Card key={ex.id}>
                    <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-lg font-medium">Exercice {ex.id}</p>
                            <p className="text-sm text-muted-foreground">
                                Inspiration : {ex.inspiration}s · Apnée : {ex.apnee}s · Expiration : {ex.expiration}s
                            </p>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => navigateToExercice(ex.id)}>
                            Choisir
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
