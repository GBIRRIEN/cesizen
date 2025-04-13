"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Check } from "lucide-react";

type Article = {
    id: string;
    title: string;
    resume: string;
    image: string;
    link: string;
}

type Categorie ={
    id: number;
    libelle: string;
}

export default function GestionArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article |null>(null);
    const [form, setForm] = useState({ title: "", resume: "", image: "", link: "" });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [categories, setCategories] = useState<Categorie[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await supabase
                .from("article")
                .select("*");

            if (data) {
                setArticles(data.map((a) => ({
                    id: a.id,
                    title: a.title,
                    resume: a.resume,
                    image: a.image,
                    link: a.link
                })));
            }
        };

        const fetchCategories = async () => {
            const { data } = await supabase
                .from("categorie")
                .select("*");
            
            if (data) {
                setCategories(data);
            }
        };

        fetchArticles();
        fetchCategories();
    }, []);

    const openEditModal = async (article: any) => {
        setSelectedArticle(article);
        setForm({ title: article.title, resume: article.resume, image: article.image, link: article.link });
        setIsEditing(true);
        setOpen(true);

        const { data } = await supabase
            .from("art_cat")
            .select("id_cat")
            .eq("id_art", article.id);
        
        if (data) {
            setSelectedCategories(data.map((d) => d.id_cat));
        }
    };

    const openAddModal = () => {
        setSelectedArticle(null);
        setForm({ title: "", resume: "", image: "", link: "" });
        setIsEditing(false);
        setOpen(true);
    };

    const handleSubmit = async () => {
        let articleId = selectedArticle?.id;

        if (isEditing && selectedArticle) {
            await supabase
                .from("article")
                .update(form)
                .eq("id", selectedArticle.id);
            
            await supabase
                .from("art_cat")
                .delete()
                .eq("id_art", selectedArticle.id);
        } else {
            const { data, error } = await supabase
                .from("article")
                .insert([form])
                .select()
                .single();

            if (data) {
                articleId = data.id;
            }
        }

        if (articleId) {
            const associations = selectedCategories.map((id_cat) => ({ id_art: articleId, id_cat }));
            
            await supabase
                .from("art_cat")
                .insert(associations);
        }

        toast.success(isEditing ? "Article modifié avec succès" : "Article ajouté avec succès");
        setOpen(false);
        location.reload();
    };

    const toggleCategory = (id: number) => {
        setSelectedCategories((prev) => 
            prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
        );
    }

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
                        <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({...form, title: e.target.value })} />
                        <Input placeholder="Résumé" value={form.resume} onChange={(e) => setForm({...form, resume: e.target.value })}/>
                        <Input placeholder="Lien de l'image" value={form.image} onChange={(e) => setForm({...form, image: e.target.value })}/>
                        <Input placeholder="Lien de l'article" value={form.link} onChange={(e) => setForm({...form, link: e.target.value })}/>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <div 
                                    key={cat.id} 
                                    onClick={() => toggleCategory(cat.id)}
                                    className={`cursor-pointer px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                                        selectedCategories.includes(cat.id) ? "border-green-500 bg-green-100" : "border-gray-300"
                                    }`}
                                >
                                    {selectedCategories.includes(cat.id) && <Check className="w-4 h-4 text-green-600"/>}
                                    <span>{cat.libelle}</span>
                                </div>
                            ))}
                        </div>

                        <Button onClick={handleSubmit} className="w-full">{isEditing ? "Enregistrer les modifications" : "Ajouter l'article"}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}