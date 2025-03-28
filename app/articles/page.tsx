import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Articles() {
    return(
        <div className="px-1 md:px-3">
            <div className={`text-4xl font-bold ${montserrat.className}`}>
              <p><span className="border-b-2 pb-1">Articles</span> ZEN</p>
            </div>
            <p className={`mt-4 text-sm md:text-lg text-gray-600 ${inter.className}`}>
                Découvrez une sélection d'articles dédiés à votre bien-être mental.<br />
                Notre objectif est de vous fournir des conseils, des techniques et des informations<br />
                pour mieux gérer le stress, améliorer votre équilibre émotionnel et cultiver une <br />
                sérénité au quotidien.
            </p>
        </div>
    )
}