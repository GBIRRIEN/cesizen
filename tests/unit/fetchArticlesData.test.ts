import { fetchArticlesData } from "@/app/articles/service";
import { createClient } from "@supabase/supabase-js";
import { expect } from '@jest/globals';

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockImplementation((tableName: string) => {
      if (tableName === "article") {
        return { select: jest.fn().mockResolvedValueOnce({ data: [{ id: 1, title: "Article 1" }, { id: 2, title: "Article 2" }], error: null }) };
      }
      if (tableName === "categorie") {
        return { select: jest.fn().mockResolvedValueOnce({ data: [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }], error: null }) };
      }
      if (tableName === "art_cat") {
        return { select: jest.fn().mockResolvedValueOnce({ data: [{ article_id: 1, category_id: 1 }, { article_id: 2, category_id: 2 }], error: null }) };
      }
      return { select: jest.fn().mockResolvedValueOnce({ data: [], error: null }) };
    })
  }))
}));

describe("fetchArticlesData", () => {
  it("devrait retourner les bonnes données pour les articles, catégories et liaisons", async () => {
    const result = await fetchArticlesData();

    expect(result).toHaveProperty("articlesData");
    expect(result).toHaveProperty("categoriesData");
    expect(result).toHaveProperty("artCatData");

    expect(result.articlesData).toEqual([
      { id: 1, title: "Article 1" },
      { id: 2, title: "Article 2" }
    ]);
    expect(result.categoriesData).toEqual([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" }
    ]);
    expect(result.artCatData).toEqual([
      { article_id: 1, category_id: 1 },
      { article_id: 2, category_id: 2 }
    ]);
  });
});
