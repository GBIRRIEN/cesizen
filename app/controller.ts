import { useEffect, useState } from 'react';
import { getLatestArticles, getUserAndSavedArticles, toggleArticleSave } from './service';
import { Article, FullUser } from '@/types';
import { supabase } from '@/lib/supabase';

export const useArticlesController = () => {
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [savedArticles, setSavedArticles] = useState<{ article_id: string }[]>([]);
  const [user, setUser] = useState<FullUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await getLatestArticles();
        setLatestArticles(articles);

        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
          console.error("Erreur lors de la récupération de l'utilisateur", error.message);
          return;
        }

        if (data?.user) {
          setUser(data.user as unknown as FullUser);

          const { savedArticles, user } = await getUserAndSavedArticles(data.user.id);
          setSavedArticles(savedArticles.map((s) => ({ article_id: String(s.id_art) })));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const isArticleSaved = (articleId: number) => {
    return savedArticles.some((saved) => saved.article_id === String(articleId));
  };

  const handleToggleSave = async (articleId: number) => {
    if (user) {
      const alreadySaved = isArticleSaved(articleId);
      await toggleArticleSave(user.id, articleId, alreadySaved);
      setSavedArticles((prev) => 
        alreadySaved 
        ? prev.filter((a) => a.article_id !== String(articleId)) 
        : [...prev, { article_id: String(articleId) }]
      );
    }
  };

  return {
    latestArticles,
    user,
    savedArticles,
    isArticleSaved,
    handleToggleSave,
  };
};
