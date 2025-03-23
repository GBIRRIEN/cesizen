import { Inter, Montserrat } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Home() {
  return (
    <div className="px-1 md:px-3">
      <div className="my-2">
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
                <p className={`mt-4 font-bold ${inter.className}`}><span className="border-b-2 pb-1">={">"}Lire</span> l'article</p>
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
                  className="mr-0 w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Surmenage : les signes d’alerte et les conseils pour aller mieux !
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                  </p>
                </div>
              </Card>

              <Card className="flex flex-col md:flex-row items-center space-x-4 p-3">
                <img 
                  src="https://pierrettedesrosiers.com/wp-content/uploads/2018/02/depression-chez-les-hommes-min.jpg"
                  alt="ArticleMisEnAvant2"
                  className="mr-0 w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Comprendre la dépression
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                  </p>
                </div>
              </Card>

              <Card className="flex flex-col md:flex-row items-center space-x-4 p-3">
                <img 
                  src="https://media.routard.com/image/11/6/famill-vacances.1557116.jpg"
                  alt="ArticleMisEnAvant3"
                  className="mr-0 w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                />
                <div className="flex flex-col items-center md:items-start">
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>
                    Pourquoi les Vacances Sont Essentielles pour la Santé Mentale ?
                  </h1>
                  <p className={`font-bold mt-2 md:mt-0 ${inter.className}`}>
                    <span className="border-b-2 pb-1">={">"}Lire</span> l'article
                  </p>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
      <div>
        <Card className="p-6">
          <div className={`text-4xl font-bold ${montserrat.className}`}>
            <p><span className="border-b-2 pb-1">Activités</span> ZEN</p>
          </div>
          <div className="mx-8">
            <Carousel>
              <CarouselContent>
                <CarouselItem>1</CarouselItem>
                <CarouselItem>1</CarouselItem>
                <CarouselItem>1</CarouselItem>
                <CarouselItem>1</CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Card>
      </div>
    </div>
  );
}
