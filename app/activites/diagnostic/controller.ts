import { Affirmation, DiagnosticResult } from "@/types";

export const calculateScore = (selected: number[], options: Affirmation[]): number => {
    return selected.reduce((acc, id) => {
        const opt = options.find(o => o.id === id);
        return acc + (opt?.points || 0);
    }, 0);
};

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
