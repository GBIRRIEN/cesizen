import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getSavedArticles(userId: string) {
  const { data, error } = await supabase
    .from("articles_saves")
    .select("id_art")
    .eq("id_user", userId);

  if (error || !data) {
    console.error("Erreur lors de la récupération des articles enregistrés", error);
    return [];
  }

  return data.map((item) => item.id_art);
}

export async function getAllArticles() {
  const { data, error } = await supabase
    .from("article")
    .select("*");

  if (error || !data) {
    console.error("Erreur lors de la récupération des articles", error);
    return [];
  }

  return data;
}

export async function removeArticleFromSaved(userId: string, articleId: number) {
  const { error } = await supabase
    .from("articles_saves")
    .delete()
    .eq("id_user", userId)
    .eq("id_art", articleId);

  if (error) {
    console.error("Erreur lors de la suppression de l'article", error);
  }
}
