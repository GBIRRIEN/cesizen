"use client";

import { Inter, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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

export default function Home() {
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
          <Card className="p-6">
            <div className={`text-4xl font-bold ${montserrat.className}`}>
              <p><span className="border-b-2 pb-1">Dernier</span> article</p>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <img 
                src="https://www.iroise-bretagne.bzh/assets/uploads/sites/2/2022/07/plage-de-tregana.jpg" 
                alt="ImageDernierArticle"
                className="rounded-lg md:w-full"
              />
              <div>
                <h1 className={`text-xl font-semibold ${montserrat.className}`}>« Vivre en bord de mer est bon pour la santé mentale et physique ». Vérification des faits</h1>
                <p className={`text-gray-500 line-clamp-3 md:line-clamp-8 ${inter.className}`}>Les personnes vivant à proximité du littoral auraient une meilleure santé mentale. C’est ce que démontre l’étude britannique publiée en 2019 dans la revue Health and Place. Les chercheurs de l’Université d’Exeter y expliquent que les ions négatifs présents dans l’air marin améliorent la production de sérotonine</p>
                <p className={`mt-4 font-bold ${inter.className}`}>
                  <a href="https://www.curieux.live/2022/05/17/vivre-en-bord-de-mer-est-bon-pour-la-sante-mentale-et-physique-verification-des-faits/#:~:text=%C2%AB%20Vivre%20en%20bord%20de%20mer,V%C3%A9rification%20des%20faits&text=Les%20personnes%20vivant%20%C3%A0%20proximit,la%20revue%20Health%20and%20Place." target="_blank" rel="noopener noreferrer">
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
              <Card className="flex flex-col md:flex-row items-center space-x-4 p-3">
                <img 
                  src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/surmenage_au_travail_1.jpeg"
                  alt="ArticleMisEnAvant1"
                  className="mr-0 w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Surmenage : les signes d’alerte et les conseils pour aller mieux !
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <a href="https://www.qare.fr/sante/surmenage/#:~:text=Le%20meilleur%20moyen%20d'%C3%A9viter,diminuer%20progressivement%20votre%20surmenage%20professionnel." target="_blank" rel="noopener noreferrer">
                      <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                    </a>
                  </p>
                </div>
              </Card>
              <Card className="flex flex-col md:flex-row items-center space-x-4 p-3">
                <img 
                  src="https://pierrettedesrosiers.com/wp-content/uploads/2018/02/depression-chez-les-hommes-min.jpg"
                  alt="ArticleMisEnAvant2"
                  className="mr-0 w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Comprendre la dépression
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <a href="https://www.ameli.fr/assure/sante/themes/depression-troubles-depressifs/comprendre-depression" target="_blank" rel="noopener noreferrer">
                      <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                    </a>          
                  </p>
                </div>
              </Card>
              <Card className="flex flex-col md:flex-row items-center space-x-4 p-3">
                <img 
                  src="https://media.routard.com/image/11/6/famill-vacances.1557116.jpg"
                  alt="ArticleMisEnAvant3"
                  className="mr-0 w-24 h-16 md:w-36 md:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Pourquoi les Vacances Sont Essentielles pour la Santé Mentale ?
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <a href="https://orthocentreberry.fr/blog/pourquoi-les-vacances-sont-essentielles-pour-la-sante-mentale-#:~:text=Les%20vacances%20favorisent%20la%20production,d'activit%C3%A9s%20agr%C3%A9ables%20et%20nouvelles." target="_blank" rel="noopener noreferrer">
                      <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          </Card>
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
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </Card>
      </div>
    </div>
  );
}