"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Inter, Montserrat } from "next/font/google"
import { match } from "assert";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

type Option = {
    id: number;
    libelle: string;
    points: number;
}

export default function Diagnostic() {
    const [options, setOptions] = useState<Option[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [resultsConfig, setResultsConfig] = useState<
        { score_min: number; score_max: number; message: string }[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            const [{ data: affirmations, error: err1 }, { data: config, error: err2 }] = await Promise.all([
                supabase.from("affirmations").select("id, libelle, points"),
                supabase.from("diagnostic_results").select("score_min, score_max, message")
            ]);

            if (err1) {
                console.error("Erreur affirmations: ", err1.message);
            } else {
                setOptions(affirmations || []);
            }

            if (err2) {
                console.error("Erreur résultats: ", err2.message);
            } else {
                setResultsConfig(config ||[]);
            }
        };

        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            
            if (data.user) {
                const user = data.user;

                const { data: userComplement, error: complementError } = await supabase
                    .from("userComplement")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (!complementError && userComplement?.role === "Admin") {
                    setIsAdmin(true);
                }
            }
        }

        fetchData();
        fetchUser();
    }, []);

    const toggleOption = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const submitQuizz = () => {
        const total = selected.reduce((acc, id) => {
            const option = options.find((opt) => opt.id == id);
            return acc + (option?.points || 0);
        }, 0);

        setScore(total);

        const matchedResult = resultsConfig.find(
            (r) => total >= r.score_min && total <= r.score_max
        );

        if (matchedResult) {
            setMessage(matchedResult.message);
        } else {
            setMessage("Aucun résultat correspondant trouvé.");
        }
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