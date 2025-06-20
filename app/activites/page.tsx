import { Inter, Montserrat } from "next/font/google";
import { Brain, HeartPulse } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Activites() {
    // Données des activités disponibles
    const activites = [
        {
            icon: <HeartPulse className="text-green-600 w-6 h-6 mr-2" />,
            title: "Exercices de respiration",
            description:
                "Ces exercices vous aident à réduire le stress et à calmer votre système nerveux. "
                + "Ils favorisent une meilleure oxygénation du cerveau et une sensation immédiate de détente.",
            link: "respiration"
        },
        {
            icon: <Brain className="text-green-600 w-6 h-6 mr-2" />,
            title: "Outil de diagnostic",
            description: 
                "Cet outil vous permet de faire un point sur votre état mental actuel. "
                + "Ils vous aident à mieux comprendre vos émotions, à repérer les signes de fatigue mentale "
                + "et à adopter des actions adaptées pour retrouver votre équilibre.",
            link: "diagnostic"
        }
    ];

    return(
        <div className="px-1 md:px-3">
            <div className={`text-4xl font-bold ${montserrat.className}`}>
              <p><span className="border-b-2 pb-1">Activités</span> ZEN</p>
            </div>
            <p className={`mt-4 text-sm md:text-lg text-gray-600 ${inter.className}`}>
                Découvrez une sélection d'activités conçues pour améliorer votre bien-être mental.<br />
                Que ce soit des exercices de respiration, des séances de méditation ou des défis de relaxation,<br />
                chaque activité est pensée pour vous aider à retrouver sérénité et équilibre.<br />
            </p>

            {/* Grille contenant les différentes cartes d’activités */}
            <div className="grid grid-cols-1 gap-4 mt-6">
                {activites.map((activite, index) => (
                    <Link href={`/activites/${activite.link}`} key={index}>
                        <Card className="bg-white shadow-sm border-rounded-2xl cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                    {activite.icon}
                                    <h2 className={`text-xl font-semibold ${montserrat.className}`}>
                                        {activite.title}
                                    </h2>
                                </div>
                                <p className={`text-gray-600 text-sm ${inter.className}`}>
                                    {activite.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}