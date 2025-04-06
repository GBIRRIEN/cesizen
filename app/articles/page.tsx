"use client";

import { Inter, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

interface Categorie {
  id: number
  createdAt: string
  lib: string
}

interface ArticleCategorie {
  id_art: number
  id_cat: number
  categorie: Categorie
}

interface Article {
  id:  number
  createdAt: string
  title: string
  resume: string
  image: string
  link: string
  categories: ArticleCategorie[]
}

export default function Articles() {
    const [Articles, setArticles] = useState([] as Article[])
    const [Categories, setCategories] = useState([] as Categorie[])

    useEffect(() => {
      fetch("http://localhost:5000/articles")
        .then((res) => res.json())
        .then((data) => {
          setArticles(data);
          const allCategories = new Map<number, Categorie>();

          data.forEach((article: Article) => {
            article.categories.forEach(({ categorie }) => {
                allCategories.set(categorie.id, categorie);
            });
          });

          setCategories(Array.from(allCategories.values()));
        })
        .catch((error) => console.error("Erreur: ", error))
    }, []);

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
            <div className="container mx-auto p-4">
              <div className="grid gap-4">
                  {Categories.map((category) => {
                  const filteredArticles = Articles.filter((article) =>
                      article.categories.some((c) => c.categorie.id === category.id)
                  );

                  return (
                      <div key={category.id} className="bg-white shadow-lg rounded-lg p-4">
                      <h2 className={`text-xl font-semibold mb-2 p-2 rounded ${montserrat.className}`}>
                          {category.lib}
                      </h2>
                      <div className="space-y-3 p-2">
                        <Carousel>
                          <CarouselContent>
                            {filteredArticles.map((article) => (
                            <CarouselItem key={article.id} className="border-b pb-2 last:border-none flex flex-col md:grid md:grid-cols-[auto_1fr] md:gap-4 items-center md:items-start">
                              <img src={article.image} alt={`articleImage${article.id}`} className="w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"/>
                              <div className="text-center md:text-left">
                                <h3 className={`text-lg font-bold ${montserrat.className}`}>{article.title}</h3>
                                <p className={`hidden md:block text-sm text-gray-600 ${inter.className}`}>
                                  {article.resume}
                                </p>
                                <a href={article.link}  target="_blank" className={`text-blue-500 hover:underline text-sm ${inter.className}`}>
                                  Lire l'article
                                </a>
                              </div>
                          </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                      </div>
                    </div>
                  );
                  })}
              </div>
            </div>
        </div>
    )
}