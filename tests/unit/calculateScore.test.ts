import { calculateScore } from "@/app/activites/diagnostic/controller";
import { Affirmation } from "@/types";
import { expect } from '@jest/globals';

describe("calculateScore", () => {
  it("doit retourner le score total basé sur les réponses sélectionnées", () => {
    const affirmations: Affirmation[] = [
      { id: 1, created_at: "2025-04-22" , libelle: "Je me sens bien", points: 3 },
      { id: 2, created_at: "2025-04-22" , libelle: "Je dors mal", points: 2 },
      { id: 3, created_at: "2025-04-22" , libelle: "Je suis stressé", points: 1 },
      { id: 4, created_at: "2025-04-22" , libelle: "Je fais du sport", points: 4 }
    ];

    const selectedIds = [1, 3, 4];

    const score = calculateScore(selectedIds, affirmations);

    expect(score).toBe(8);
  });

  it("retourne 0 si aucun ID ne correspond", () => {
    const affirmations: Affirmation[] = [
      { id: 1, created_at: "2025-04-22" , libelle: "A", points: 2 },
      { id: 2, created_at: "2025-04-22" , libelle: "B", points: 4 }
    ];

    const selectedIds = [99];

    const score = calculateScore(selectedIds, affirmations);

    expect(score).toBe(0);
  });

  it("ignore les affirmations avec des points non définis", () => {
    const affirmations: Affirmation[] = [
      { id: 1, created_at: "2025-04-22" , libelle: "A", points: 2 },
      { id: 2, created_at: "2025-04-22" , libelle: "B", points: undefined as any }
    ];

    const selectedIds = [1, 2];

    const score = calculateScore(selectedIds, affirmations);

    expect(score).toBe(2);
  });
});
