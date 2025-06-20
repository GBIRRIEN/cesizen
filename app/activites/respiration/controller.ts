import { useRouter } from "next/navigation";

// Hook personnalisé pour encapsuler la logique de navigation vers un exercice de respiration
export const useExerciceNavigator = () => {
    const router = useRouter();

    // Fonction pour rediriger vers la page d'un exercice spécifique
    const navigateToExercice = (exerciceId: number) => {
        router.push(`/activites/respiration/${exerciceId}`);
    };

    return { navigateToExercice };
};
