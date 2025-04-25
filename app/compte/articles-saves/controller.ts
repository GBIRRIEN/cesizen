import { getCurrentUser, getSavedArticles, getAllArticles, removeArticleFromSaved } from './service';

export async function getSavedArticlesForUser() {
  const user = await getCurrentUser();
  if (!user) return [];

  const savedIds = await getSavedArticles(user.id);
  const allArticles = await getAllArticles();

  return allArticles.filter((a) => savedIds.includes(a.id));
}

export async function toggleSavedArticle(articleId: number) {
  const user = await getCurrentUser();
  if (!user) return;

  await removeArticleFromSaved(user.id, articleId);
}
