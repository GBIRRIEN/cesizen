import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Footer() {
  return (
    <footer className={`flex justify-between items-center p-4 bg-white font-bold ${montserrat.className}`}>
        <div className="flex items-center">
            <Image src="/ykykcesizen3.svg" alt="Logo" width={100} height={100} />
        </div>
        <nav className="flex flex-col space-y-2 text-center text-sm">
            <a href="#" className="text-gray-700 hover:text-gray-900">Mentions légales</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 mt-4">Conditions d'utilisation</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 mt-4">Confidentialité</a>
        </nav>
    </footer>
  );
}