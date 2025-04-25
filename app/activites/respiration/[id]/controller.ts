import type { Phase, ExerciceRespiration } from "@/types";

export const getNextPhase = (
    current: Phase, 
    exercice: ExerciceRespiration
): { next: Phase; duration: number } => {
    switch (current) {
        case "inspiration":
            return exercice.apnee > 0
                ? { next: "apnee", duration: exercice.apnee }
                : { next: "expiration", duration: exercice.expiration };
        case "apnee":
            return { next: "expiration", duration: exercice.expiration };
        case "expiration":
            return { next: "inspiration", duration: exercice.inspiration };
    }
};

export const getPhaseLabel = (phase: Phase): string => {
    switch (phase) {
        case "inspiration":
            return "Inspirez...";
        case "apnee":
            return "Retenez...";
        case "expiration":
            return "Expirez...";
    }
};
