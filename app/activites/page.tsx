import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Activites() {
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
        </div>
    )
}