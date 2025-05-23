// app/articles/page.tsx
"use client";

import { useArticlesController } from "@/app/articles/controller";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Articles() {
  const {
    articles,
    categories,
    articleCategories,
    user,
    isArticleSaved,
    handleToggleSave
  } = useArticlesController();

  return (
    <div className="px-1 md:px-3">
      <div className={`text-4xl font-bold ${montserrat.className}`}>
        <p>
          <span className="border-b-2 pb-1">Articles</span> ZEN
        </p>
      </div>
      <p className={`mt-4 text-sm md:text-lg text-gray-600 ${inter.className}`}>
        Découvrez une sélection d'articles dédiés à votre bien-être mental. <br />
        Notre objectif est de vous fournir des conseils, des techniques et des informations <br />
        pour mieux gérer le stress, améliorer votre équilibre émotionnel et cultiver une <br />
        sérénité au quotidien.
      </p>

      <div className="container mx-auto p-4">
        <div className="grid gap-4">
          {categories.map((category) => {
            const filteredArticles = articles.filter((article) =>
              articleCategories.some(
                (ac) => ac.id_art === article.id && ac.id_cat === category.id
              )
            );

            return (
              <div key={category.id} className="bg-white shadow-lg rounded-lg p-4">
                <h2 className={`text-xl font-semibold mb-2 p-2 rounded ${montserrat.className}`}>
                  {category.libelle}
                </h2>
                <div className="space-y-3 p-2">
                  <Carousel>
                    <CarouselContent className="flex">
                      {filteredArticles.map((article) => {
                        const saved = isArticleSaved(article.id);

                        return (
                          <CarouselItem key={article.id} className="min-w-full sm:min-w-[80%] md:min-w-[50%] lg:min-w-[33.33%] px-2">
                            <div className="relative border-b pb-2 last:border-none flex flex-col md:grid md:grid-cols-[auto_1fr] md:gap-4 items-center md:items-start">
                              {user && (
                                <button
                                  onClick={() => handleToggleSave(article.id)}
                                  className="absolute top-2 right-2 text-gray-600 hover:text-green-600 transition"
                                >
                                  {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                                </button>
                              )}
                              <img
                                src={article.image!}
                                alt={`articleImage${article.id}`}
                                className="w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="text-center md:text-left">
                                <h3 className={`text-lg font-bold ${montserrat.className} break-words max-w-[12rem] sm:max-w-full`}>
                                  {article.title}
                                </h3>
                                <p className={`hidden md:block text-sm text-gray-600 ${inter.className}`}>
                                  {article.resume}
                                </p>
                                <a
                                  href={article.link!}
                                  target="_blank"
                                  className={`text-blue-500 hover:underline text-sm ${inter.className}`}
                                >
                                  Lire l'article
                                </a>
                              </div>
                            </div>
                          </CarouselItem>
                        );
                      })}
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
  );
}
