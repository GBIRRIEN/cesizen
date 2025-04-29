import { supabase } from "@/lib/supabase";
import { ArticleInsert } from "@/types";

export async function getAllArticles() {
  const { data } = await supabase.from("article").select("*");
  return data || [];
}

export async function getAllCategories() {
  const { data } = await supabase.from("categorie").select("*");
  return data || [];
}

export async function getArticleCategories(articleId: number) {
  const { data } = await supabase
    .from("art_cat")
    .select("id_cat")
    .eq("id_art", articleId);

  return data?.map((item) => item.id_cat) || [];
}

export async function addArticleWithCategories(article: ArticleInsert, categoryIds: number[]) {
  const { data: insertedArticle } = await supabase
    .from("article")
    .insert([article])
    .select()
    .single();

  if (!insertedArticle) return;

  const associations = categoryIds.map((id_cat) => ({
    id_art: insertedArticle.id,
    id_cat,
  }));

  await supabase.from("art_cat").insert(associations);
}

export async function updateArticleWithCategories(articleId: number, article: ArticleInsert, categoryIds: number[]) {
  await supabase.from("article").update(article).eq("id", articleId);
  await supabase.from("art_cat").delete().eq("id_art", articleId);

  const associations = categoryIds.map((id_cat) => ({
    id_art: articleId,
    id_cat,
  }));

  await supabase.from("art_cat").insert(associations);
}
