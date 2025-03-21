import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
        <div className="flex items-center">
            <Image src="/logocesizen.svg" alt="Logo" width={140} height={140}/>
        </div>
        <nav className="flex space-x-6 text-lg mr-10">
            <a href="#" className="text-gray-700 hover:text-gray-900">Accueil</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Services</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Se connecter</a>
        </nav>
    </header>
  );
}