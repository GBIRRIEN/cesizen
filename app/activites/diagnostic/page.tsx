"use client"

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Inter, Montserrat } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

type Option = {
    id: number;
    label: string;
    points: number;
}

const options: Option[] = [
    { id: 1, label: "Je dors mal ou peu", points: 3},
    { id: 2, label: "Je me sens souvent fatigué(e)", points: 2},
    { id: 3, label: "Je ressens de l'anxiété ou du stress", points: 4},
    { id: 4, label: "Je suis irritable ou nerveux(se)", points: 3},
    { id: 5, label: "J’ai des difficultés à me concentrer", points: 3 },
    { id: 6, label: "Je ressens une charge mentale élevée", points: 4},
    { id: 7, label: "Je me sens démotivé(e)", points: 2 },
    { id: 8, label: "Je fais des pauses régulières dans ma journée", points: -2 },
    { id: 9, label: "Je prends du temps pour moi chaque jour", points: -3 },
    { id: 10, label: "Je me sens globalement serein(e)", points: -3 },
    { id: 11, label: "Je suis entouré(e) de personnes bienveillantes", points: -2 },
    { id: 12, label: "Je m’autorise à ralentir quand c’est nécessaire", points: -1 },
];

export default function Diagnostic() {
    const [selected, setSelected] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);

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
    };

    const getResult = () => {
        if (score == null) {
            return null;
        }

        if (score >= 15) {
            return "Votre niveau de tension mentale est très élevé. Il est fortement conseillé de faire une pause prolongée, de parler à un professionnel ou de pratiquer une activité relaxante.";
        }

        if (score >= 8) {
            return "Vous semblez en état de surcharge mentale. Prenez du temps pour vous et intégrez des routines de bien-être dans votre quotidien.";
        }

        if (score >= 3) {
            return "Légère tension détectée. Quelques ajustements (respiration, pauses, activité douce) pourraient améliorer votre équilibre.";
        }

        if (score >= -4) {
            return "Votre état mental est plutôt bon. Continuez à prendre soin de vous au quotidien.";
        }

        return "Vous semblez très détendu(e) et aligné(e). Conservez ces habitudes bénéfiques !";
    }

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
                                <span className={`${inter.className}`}>{option.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button onClick={submitQuizz} className="w-full">Soumettre</Button>

            {score !== null && (
                <Card className="mt-4">
                    <CardContent className="p-4">
                        <p className={`text-sm ${inter.className}`}>
                            <span className="font-semibold">Diagnostic :</span> {getResult()}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Score obtenu : {score}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}