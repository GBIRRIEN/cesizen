"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Inter, Montserrat } from "next/font/google"
import { fetchAffirmations, fetchResultsConfig, fetchUserRole } from "./service";
import { calculateScore, getDiagnosticMessage } from "./controller";
import { Affirmation, DiagnosticResult } from "@/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Diagnostic() {
    const [options, setOptions] = useState<Affirmation[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [resultsConfig, setResultsConfig] = useState<DiagnosticResult[]>([]);

    useEffect(() => {
        const init = async () => {
            try {
                const [opt, conf, role] = await Promise.all([
                    fetchAffirmations(),
                    fetchResultsConfig(),
                    fetchUserRole()
                ]);
                setOptions(opt);
                setResultsConfig(conf);
                setIsAdmin(role === "Admin");
            } catch (e) {
                console.error(e);
            }
        };
        init();
    }, []);

    const toggleOption = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const submitQuizz = () => {
        const total = calculateScore(selected, options);
        const msg = getDiagnosticMessage(total, resultsConfig);
        setScore(total);
        setMessage(msg);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto space-y-6">
            <h1 className={`text-3xl font-bold ${montserrat.className}`}>Outil de diagnostic mental</h1>
            <p className={`text-gray-600 ${inter.className}`}>
                Cochez les affirmations qui vous correspondent en ce moment :
            </p>

            <Card>
                <CardContent className="py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => toggleOption(option.id)}
                                className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition
                                    ${selected.includes(option.id) ? "bg-green-100 border border-green-500" : "hover:bg-gray-100"}`}
                            >
                                <Checkbox checked={selected.includes(option.id)} />
                                <span className={`${inter.className}`}>{option.libelle}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button onClick={submitQuizz} className="w-full bg-green-500 hover:bg-green-600">Soumettre</Button>

            {score !== null && (
                <Card className="mt-4">
                    <CardContent className="p-4">
                        <p className={`text-sm ${inter.className}`}>
                            <span className="font-semibold">Diagnostic :</span> {message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Score obtenu : {score}</p>
                    </CardContent>
                </Card>
            )}
            
            {isAdmin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = "/compte/admin/diagnostic/gestion-resultats"}
                    >
                    Gérer les messages de résultat
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = "/compte/admin/diagnostic/gestion-affirmations"}
                    >
                    Gérer les affirmations
                    </Button>
                </div>
            )}
        </div>
    )
}