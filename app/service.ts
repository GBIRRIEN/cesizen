// service.ts
import { supabase } from '@/lib/supabase';
import { Article, ArticleSave, FullUser } from '@/types';

export const getLatestArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('article')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) {
    throw new Error('Erreur lors de la récupération des articles : ' + error.message);
  }
  return data as Article[];
};

export const getUserAndSavedArticles = async (userId: string): Promise<{ savedArticles: ArticleSave[]; user: FullUser }> => {
  const { data: savedArticles, error: savedError } = await supabase
    .from('articles_saves')
    .select('id_art')
    .eq('id_user', userId);

  if (savedError) {
    throw new Error('Erreur lors de la récupération des articles sauvegardés : ' + savedError.message);
  }

  const { data: user, error: userError } = await supabase
    .from('userComplement')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError) {
    throw new Error('Erreur lors de la récupération de l\'utilisateur : ' + userError.message);
  }

  return { savedArticles: savedArticles as ArticleSave[], user: user as FullUser };
};

export const toggleArticleSave = async (userId: string, articleId: number, isSaved: boolean) => {
  if (isSaved) {
    await supabase
      .from('articles_saves')
      .delete()
      .eq('id_user', userId)
      .eq('id_art', articleId);
  } else {
    await supabase
      .from('articles_saves')
      .insert({ id_user: userId, id_art: articleId });
  }
};
