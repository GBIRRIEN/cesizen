"use client";

import { useEffect, useState } from 'react';
import { Inter, Montserrat } from "next/font/google";
import { Bookmark, BookmarkCheck } from "lucide-react";
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
                <CarouselItem key="Exercice de respiration">
                  <Card className="relative flex items-center justify-center h-48 md:h-80 rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://www.shutterstock.com/image-vector/breathing-icon-set-breath-difficulties-260nw-2425994069.jpg)`,
                        filter: "blur(5px)",
                        transform: "scale(1.1)"
                      }}
                    />
                    <Link href="/activites/respiration">
                      <Button className="relative z-10 text-white text-sm md:text-2xl font-bold bg-green-600 px-4 md:px-6 py-2 cursor-pointer md:px-8 md:py-4 rounded-md">
                        Exercices de respiration
                      </Button>
                    </Link>
                  </Card>
                </CarouselItem>
                <CarouselItem key="Diagnostic">
                  <Card className="relative flex items-center justify-center h-48 md:h-80 rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://visionarymarketing.com/wp-content/uploads/2013/05/jumpstory-download20191206-084704.jpg)`,
                        filter: "blur(5px)",
                        transform: "scale(1.1)"
                      }}
                    />
                    <Link href="/activites/diagnostic">
                      <Button className="relative z-10 text-white text-sm md:text-2xl font-bold bg-green-600 px-4 py-2 cursor-pointer md:px-8 md:py-4 rounded-md">
                        Outils de diagnostic
                      </Button>
                    </Link>
                  </Card>
                </CarouselItem>
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