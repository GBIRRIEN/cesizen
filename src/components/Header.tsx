"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, House, Blocks, Newspaper, UserRoundPlus, UserRound } from "lucide-react";
import { Montserrat } from "next/font/google";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import AuthModal from "./AuthModale";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data : { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 shadow-md bg-white font-bold ${montserrat.className}`}>
      <div className="flex items-center">
        <a href="/">
          <Image src="/ykykcesizen3.svg" alt="Logo" width={140} height={140} className="w-28 h-auto md:w-34" />
        </a>
      </div>

      <nav className="hidden md:flex space-x-6 text-lg">
        <a href="/" className="flex text-gray-600 hover:text-gray-900">
          <House className="mr-1" />
          Accueil
        </a>
        <a href="/articles/" className="flex text-gray-600 hover:text-gray-900">
          <Newspaper className="mr-1" />
          Articles
        </a>
        <a href="/activites/" className="flex text-gray-600 hover:text-gray-900">
         <Blocks className="mr-1"/>
          Activités
        </a>
        {user ? (
          <a href="/compte" className="flex text-gray-600 hover:text-gray-900">
            <UserRound className="mr-1" />
            Mon compte
          </a>
        ) : (
          <button onClick={() => setIsModalOpen(true)} className="flex text-gray-600 hover:text-gray-900 cursor-pointer">
            <UserRoundPlus className="mr-1" />
            Se connecter
          </button>
        )}
      </nav>

      <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <div className={`fixed top-0 right-0 h-full w-64 bg-[#00BF63] shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
        <button className="absolute top-4 right-4 text-gray-700" onClick={() => setIsOpen(false)}>
          <X color="white" size={32} />
        </button>

        <nav className="flex flex-col items-start mt-16 space-y-6 pl-6 text-lg">
          <a href="/" className="flex text-white">
            <House color="white" className="mr-3" />
            <p className="border-b-2 border-white pb-1">Accueil</p>
          </a>
          <a href="/articles/" className="flex text-white">
            <Newspaper color="white" className="mr-3" />
            <p className="border-b-2 border-white pb-1">Articles</p>
          </a>
          <a href="/activites/" className="flex text-white">
            <Blocks color="white" className="mr-3" />
            <p className="border-b-2 border-white pb-1">Activités</p>
          </a>
          {user ? (
            <a href="/compte" className="flex text-white">
              <UserRound color="white" className="mr-3" />
              <p className="border-b-2 border-white pb-1">Mon compte</p>
            </a>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="flex text-white">
              <UserRoundPlus color="white" className="mr-3" />
              <p className="border-b-2 border-white pb-1">Se connecter</p>
            </button>
          )}
        </nav>
      </div>
      </header>

    <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
