"use client";

import { useEffect, useState } from "react";
import {
  fetchArticlesData,
  fetchUserAndSavedArticles,
  toggleSaveArticle
} from "@/app/articles/service";
import { Categorie, Article, ArticleCategorie } from "@/types"

export const useArticlesController = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [articleCategories, setArticleCategories] = useState<ArticleCategorie[]>([]);
  const [savedArticles, setSavedArticles] = useState<{ article_id: string }[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { articlesData, categoriesData, artCatData } = await fetchArticlesData();
        setArticles(articlesData);
        setCategories(categoriesData);
        setArticleCategories(artCatData);

        const { user, saved } = await fetchUserAndSavedArticles();
        setUser(user);
        setSavedArticles(saved);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    load();
  }, []);

  const isArticleSaved = (articleId: number) => {
    return savedArticles.some((saved) => saved.article_id === String(articleId));
  };

  const handleToggleSave = async (articleId: number) => {
    if (!user) return;
    const isSaved = isArticleSaved(articleId);
    try {
      const action = await toggleSaveArticle(articleId, user.id, isSaved);
      setSavedArticles((prev) =>
        action === "removed"
          ? prev.filter((s) => s.article_id !== String(articleId))
          : [...prev, { article_id: String(articleId) }]
      );
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
    }
  };

  return {
    articles,
    categories,
    articleCategories,
    savedArticles,
    user,
    isArticleSaved,
    handleToggleSave,
  };
};
