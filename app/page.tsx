"use client";

import { useEffect, useState } from 'react';
import { Inter, Montserrat } from "next/font/google";
import { Bookmark, BookmarkCheck, Brain, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"
import { Button } from "@/src/components/ui/button";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

interface Article {
  id: number;
  title: string;
  resume: string;
  image: string;
  link: string;
  created_at: string
}

export default function Home() {
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

  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<{ article_id: string }[]>([]);
  const [user, setUser] = useState<any>(null);

  const isArticleSaved = (articleId: number) => {
    return savedArticles.some((saved) => saved.article_id === String(articleId));
  };

  const handleToggleSave = async (articleId: number) => {
    const articleIdStr = String(articleId);

    if (!user) {
      return;
    }

    const alreadySaved = isArticleSaved(articleId);

    if (alreadySaved) {
      await supabase
        .from("articles_saves")
        .delete()
        .eq("id_user", user.id)
        .eq("id_art", articleId);

      setSavedArticles((prev) => 
        prev.filter((a) => a.article_id !== articleIdStr)
      );
    } else {
      await supabase
        .from("articles_saves")
        .insert({ id_user: user.id, id_art: articleId });

      setSavedArticles((prev) => [...prev, { article_id: articleIdStr }]);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('article')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error("Erreur de récupération des articles :", error.message);
      } else {
        setLatestArticles(data);
      }
    };

    const fetchUserAndSavedArticles = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        const { data: saved, error: savedError } = await supabase
          .from("articles_saves")
          .select("id_art")
          .eq("id_user", user.id);

        if (saved) {
          setSavedArticles(saved.map((s) => ({ article_id: String(s.id_art) })));
        }
      }
    };

    fetchArticles();
    fetchUserAndSavedArticles();
  }, []);

  return (
    <div className="px-1 md:px-3">
      <div className="h-screen flex flex-col justify-center items-center text-center bg-green-600 text-white">
        <Image src="/ykykcesizen1.svg" alt="Logo" width={140} height={140} className="w-60 h-auto md:w-90" />
        <p className="mt-4 text-xl md:text-2xl">L'application de votre santé mentale</p>
        <a href="#contenus" className="mt-10 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
          Découvrir
        </a>
      </div>
      <div id="contenus" className="my-2">
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {latestArticles.length > 0 && (
            <>
              <Card className="p-6">
                <div className={`text-4xl font-bold ${montserrat.className}`}>
                  <p><span className="border-b-2 pb-1">Dernier</span> article</p>
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4 relative">
                  {user && (
                    <button 
                      onClick={() => handleToggleSave(latestArticles[0].id)}
                      className="absolute top-2 right-2 md:top-4 md:left-4 text-white hover:text-green-300 transition z-10"
                    >
                      {isArticleSaved(latestArticles[0].id) ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
                    </button>
                  )}
                  <img 
                    src={latestArticles[0].image}
                    alt={`articleImage${latestArticles[0].id}`}
                    className="rounded-lg md:w-full"
                  />
                  <div>
                    <h1 className={`text-xl font-semibold ${montserrat.className}`}>
                      {latestArticles[0].title}
                    </h1>
                    <p className={`text-gray-500 line-clamp-3 md:line-clamp-8 ${inter.className}`}>
                      {latestArticles[0].resume}
                    </p>
                    <p className={`mt-4 font-bold ${inter.className}`}>
                      <a href={latestArticles[0].link} target="_blank" rel="noopener noreferrer">
                        <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className={`text-4xl font-bold ${montserrat.className}`}>
                  <p><span className="border-b-2 pb-1">Autres</span> articles</p>
                </div>
                <div className="my-4 space-y-4">
                  {latestArticles.slice(1).map((article) => (
                    <Card key={article.id} className="relative flex flex-col md:flex-row items-center space-x-4 p-3">
                      {user && (
                        <button
                          onClick={() => handleToggleSave(article.id)}
                          className="absolute bottom-2 right-2 text-gray-600 hover:text-green-600 transition"
                        > 
                          {isArticleSaved(article.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                        </button>
                      )}
                      <img 
                        src={article.image}
                        alt={`articleImage${article.id}`}
                        className="mr-0 w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex flex-col items-center md:items-start">
                        <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                          {article.title}
                        </h1>
                        <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                          <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                          </a>
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
        <div className="my-8 flex flex-col items-center">
          <Link href="/articles">
            <Button className="bg-green-600 text-md text-white px-6 py-3 font-semibold shadow-md cursor-pointer hover:bg-green-800">
              Voir plus d'articles
            </Button>
          </Link>
        </div>
      </div>
      <div>
      <Card className="p-6">
        <div className={`text-3xl md:text-4xl font-bold ${montserrat.className}`}>
          <p><span className="border-b-2 pb-1">Activités</span> ZEN</p>
        </div>
        <div className="mx-8">
          <Card className="px-8">
            <Carousel>
              <CarouselContent>
                {activites.map((activite, index) => (
                  <CarouselItem key={activite.title}>
                    <Link href={`/activites/${activite.link}`}>
                      <Card key={index} className="bg-white shadow-sm border-rounded-2xl cursor-pointer">
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Card>
        </div>
      </Card>
      </div>
    </div>
  );
}