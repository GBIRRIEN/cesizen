import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const fetchArticlesData = async () => {
  const [
    { data: articlesData, error: articlesError },
    { data: categoriesData, error: categoriesError },
    { data: artCatData, error: artCatError }
  ] = await Promise.all([
    supabase.from("article").select("*"),
    supabase.from("categorie").select("*"),
    supabase.from("art_cat").select("*")
  ]);

  if (articlesError || categoriesError || artCatError) {
    throw articlesError || categoriesError || artCatError;
  }

  return { articlesData, categoriesData, artCatData };
};

export const fetchUserAndSavedArticles = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, saved: [] };

  const { data: saved, error: savedError } = await supabase
    .from("articles_saves")
    .select("id_art")
    .eq("id_user", user.id);

  if (savedError) throw savedError;

  return {
    user,
    saved: saved.map((s) => ({ article_id: String(s.id_art) })),
  };
};

export const toggleSaveArticle = async (
  articleId: number,
  userId: string,
  isSaved: boolean
) => {
  if (isSaved) {
    const { error } = await supabase
      .from("articles_saves")
      .delete()
      .eq("id_user", userId)
      .eq("id_art", articleId);

    if (error) throw error;
    return "removed";
  } else {
    const { error } = await supabase
      .from("articles_saves")
      .insert({ id_user: userId, id_art: articleId });

    if (error) throw error;
    return "added";
  }
};
