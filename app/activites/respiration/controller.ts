import { useRouter } from "next/navigation";

export const useExerciceNavigator = () => {
    const router = useRouter();

    const navigateToExercice = (exerciceId: number) => {
        router.push(`/activites/respiration/${exerciceId}`);
    };

    return { navigateToExercice };
};
