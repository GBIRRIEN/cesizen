"use client";

import { useEffect, useState } from 'react';
import { Book, BookmarkCheck } from 'lucide-react';
import { createClient } from "@supabase/supabase-js";

interface Article {
    id: number;
    title: string;
    image: string;
}

export default function ArticlesEnregistresPage() {
    const [user, setUser] = useState<any>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [savedArticles, setSavedArticles] = useState<number[]>([]);
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                return;
            }

            setUser(user);

            const { data: savedData, error: savedError } = await supabase
                .from("articles_saves")
                .select("id_art")
                .eq("id_user", user.id);

            if (savedError) {
                console.error("Erreur lors de la récupération des articles enregistrés", savedError);
                return;
            }

            const savedIds = savedData.map((item) => item.id_art);
            setSavedArticles(savedIds);

            const { data: allArticles, error: articleError } = await supabase
                .from("article")
                .select("*");
            
            if (articleError) {
                console.error("Erreur lors de la récupération des articles", articleError);
                return;
            }

            const filtered = allArticles.filter((a) => savedIds.includes(a.id));
            setArticles(filtered);
        };

        fetchData();
    }, []);

    const handleToggleSave = async (articleId: number) => {
        if (!user) {
            return;
        }

        const { error } = await supabase
            .from("articles_saves")
            .delete()
            .eq("id_user", user.id)
            .eq("id_art", articleId);

        if (error) {
            console.error("Erreur lors de la suppression", error);
            return;
        }

        setSavedArticles((prev) => prev.filter((id) => id !== articleId));
        setArticles((prev) => prev.filter((a) => a.id !== articleId));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Articles enregistrés</h1>

            {articles.length === 0 ? (
                <p className="text-gray-500">Vous n'avez pas encore enregistré d'article.</p>
            ): (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div key={article.id} className="relative bg-white shadow rounded-lg overflow-hidden">
                            <img 
                                src={article.image}
                                alt={`articleImage${article.id}`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{article.title}</h2>
                            </div>
                            <button
                                onClick={() => handleToggleSave(article.id)}
                                className="absolute top-2 right-2 text-green-600 hover:text-gra-400 transition"
                            >
                                <BookmarkCheck size={24}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}