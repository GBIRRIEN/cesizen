'use client';

import { useEffect, useState } from 'react';
import { BookmarkCheck } from 'lucide-react';
import { getSavedArticlesForUser, toggleSavedArticle } from './controller';
import { Article } from "@/types";

export default function ArticlesEnregistresPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const savedArticles = await getSavedArticlesForUser();
      setArticles(savedArticles);
    };
    fetchArticles();
  }, []);

  const handleToggleSave = async (articleId: number) => {
    const updated = await toggleSavedArticle(articleId);
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Articles enregistrés</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">Vous n'avez pas encore enregistré d'article.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="relative bg-white shadow rounded-lg overflow-hidden">
              <img
                src={article.image!}
                alt={`articleImage${article.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{article.title}</h2>
              </div>
              <button
                onClick={() => handleToggleSave(article.id)}
                className="absolute top-2 right-2 text-green-600 hover:text-gray-400 transition"
              >
                <BookmarkCheck size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
