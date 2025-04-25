"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Check } from "lucide-react";

import {
  useArticlesController,
  useArticleFormController
} from "@/app/compte/admin/gestion-articles/controller";

export default function GestionArticles() {
  const {
    articles,
    categories,
    open,
    isEditing,
    form,
    selectedCategories,
    openAddModal,
    openEditModal,
    setForm,
    toggleCategory,
    handleSubmit,
    setOpen
  } = useArticlesController();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des articles</h1>
        <Button onClick={openAddModal} className="bg-green-600 text-white">
          Ajouter un article
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="w-full">
            <img src={article.image} alt={`articleImage${article.id}`} className="rounded-t-lg object-cover w-full h-48" />
            <CardContent className="p-4">
              <p className="text-sm font-semibold truncate">{article.title}</p>
              <Button onClick={() => openEditModal(article)} className="mt-2 w-full">Modifier l'article</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier l'article" : "Ajouter un article"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Résumé" value={form.resume} onChange={(e) => setForm({ ...form, resume: e.target.value })} />
            <Input placeholder="Lien de l'image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <Input placeholder="Lien de l'article" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`cursor-pointer px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                    selectedCategories.includes(cat.id) ? "border-green-500 bg-green-100" : "border-gray-300"
                  }`}
                >
                  {selectedCategories.includes(cat.id) && <Check className="w-4 h-4 text-green-600" />}
                  <span>{cat.libelle}</span>
                </div>
              ))}
            </div>

            <Button onClick={handleSubmit} className="w-full">{isEditing ? "Enregistrer les modifications" : "Ajouter l'article"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
