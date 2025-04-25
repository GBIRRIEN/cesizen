"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getAllArticles,
  getAllCategories,
  addArticleWithCategories,
  updateArticleWithCategories,
  getArticleCategories
} from "@/app/compte/admin/gestion-articles/service";

import { ArticleInsert, Article, Categorie } from "@/types";

export function useArticlesController() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [form, setForm] = useState<ArticleInsert>({
    title: "",
    resume: "",
    image: "",
    link: "",
  });
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getAllArticles();
      const categories = await getAllCategories();
      setArticles(articles);
      setCategories(categories);
    };

    fetchData();
  }, []);

  const openAddModal = () => {
    setSelectedArticle(null);
    setForm({
      title: "",
      resume: "",
      image: "",
      link: "",
    });
    setIsEditing(false);
    setSelectedCategories([]);
    setOpen(true);
  };

  const openEditModal = async (article: Article) => {
    setSelectedArticle(article);
    setForm({
      title: article.title || "",
      resume: article.resume || "",
      image: article.image || "",
      link: article.link || "",
    });
    setIsEditing(true);
    setOpen(true);

    const categoryIds = await getArticleCategories(article.id);
    setSelectedCategories(categoryIds);
  };

  const handleSubmit = async () => {
    if (isEditing && selectedArticle) {
      await updateArticleWithCategories(selectedArticle.id, form, selectedCategories);
      toast.success("Article modifié avec succès");
    } else {
      await addArticleWithCategories(form, selectedCategories);
      toast.success("Article ajouté avec succès");
    }

    setOpen(false);
    window.location.reload();
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  return {
    articles,
    categories,
    form,
    open,
    isEditing,
    selectedCategories,
    setForm,
    setOpen,
    openAddModal,
    openEditModal,
    toggleCategory,
    handleSubmit,
  };
}
