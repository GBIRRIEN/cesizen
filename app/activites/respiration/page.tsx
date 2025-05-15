"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { fetchExercices } from "./service";
import { useExerciceNavigator } from "./controller";
import { ExerciceRespiration } from "@/types";
import { useRouter } from "next/navigation";

export default function Respiration() {
    const router = useRouter();
    const [exercices, setExercices] = useState<ExerciceRespiration[]>([]);
    const [custom, setCustom] = useState({ inspiration: 4, apnee: 4, expiration: 4 });
    const { navigateToExercice } = useExerciceNavigator();

    const handleCustomSubmit = () => {
        router.push(`/activites/respiration/personnalise?inspiration=${custom.inspiration}&apnee=${custom.apnee}&expiration=${custom.expiration}`);
    }

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
                        <Button className="bg-green-500 hover:bg-green-600 cursor-pointer" onClick={() => navigateToExercice(ex.id)}>
                            Choisir
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <Card key="personnalise">
                <CardContent className="p-4 space-y-4">
                        <p className="text-lg font-medium">Configurer un exercice</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {["inspiration", "apnee", "expiration"].map((phase) => (
                                <div key={phase}>
                                    <label className="block test-sm font-medium capitalize">{phase}</label>
                                    <input 
                                        type="number"
                                        min={0}
                                        value={custom[phase as keyof typeof custom]}
                                        onChange={(e) => setCustom({ ...custom, [phase]: Number(e.target.value) })}
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                </div>
                            ))}
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-600 cursor-pointer" onClick={handleCustomSubmit}>
                            Choisir
                        </Button>
                </CardContent>
            </Card>
        </div>
    );
}
