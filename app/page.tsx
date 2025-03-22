import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"]});

export default function Home() {
  return (
    <div>
      <Header />
      <div className="my-2">
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-lg shadow-md bg-white">
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
                <h1 className={`text-xl font-semibold ${montserrat.className}`}>Titre de l'article</h1>
                <p className={`text-gray-500 line-clamp-3 md:line-clamp-8 ${inter.className}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                <p className={`mt-4 ${inter.className}`}><span className="border-b-2 pb-1">Lire</span> la suite</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-white">
            <div className={`text-4xl font-bold ${montserrat.className}`}>
              <p><span className="border-b-2 pb-1">Autres</span> articles</p>
            </div>
            <div className="my-4 space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-100">
                <img 
                  src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/surmenage_au_travail_1.jpeg"
                  alt="ArticleMisEnAvant1"
                  className="w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                />
                <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>Titre de l'article mis en avant 1</h1>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-100">
                <img 
                    src="https://pierrettedesrosiers.com/wp-content/uploads/2018/02/depression-chez-les-hommes-min.jpg"
                    alt="ArticleMisEnAvant2"
                    className="w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                  />
                  <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>Titre de l'article mis en avant 2</h1>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-100">
                <img 
                  src="https://media.routard.com/image/11/6/famill-vacances.1557116.jpg"
                  alt="ArticleMisEnAvant3"
                  className="w-24 h-16 md:w-30 md:h-15 rounded-lg object-cover"
                />
                <h1 className={`text-sm md:text-lg font-bold ${montserrat.className}`}>Titre de l'article mis en avant 3</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
