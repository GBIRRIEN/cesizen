import { Affirmation, DiagnosticResult } from "@/types";

/**
 * Calcule le score total à partir des affirmations sélectionnées.
 * 
 * @param selected - Liste des ID d'affirmations cochées par l'utilisateur.
 * @param options - Liste complète des affirmations disponibles (avec leurs points).
 * @returns Le score total obtenu par l'utilisateur.
 */
export const calculateScore = (selected: number[], options: Affirmation[]): number => {
    return selected.reduce((acc, id) => {
        const opt = options.find(o => o.id === id);
        // Si l'affirmation existe, on ajoute ses points, sinon 0
        return acc + (opt?.points || 0);
    }, 0);
};

/**
 * Retourne le message correspondant à un score donné, selon la configuration.
 * 
 * @param score - Score total obtenu.
 * @param config - Liste des plages de scores (score_min/score_max) avec messages associés.
 * @returns Le message de diagnostic lié à la plage du score, ou un message par défaut.
 */
export const getDiagnosticMessage = (
    score: number,
    config: DiagnosticResult[]
): string => {
    const result = config.find((r) => 
        r.score_min !== null &&
        r.score_max !== null &&
        score >= r.score_min && 
        score <= r.score_max
    );
    return result?.message || "Aucun résultat correspondant trouvé.";
};
