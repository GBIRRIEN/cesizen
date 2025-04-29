import { fetchAffirmations, addAffirmation, updateAffirmation, deleteAffirmation } from "./service";
import { toast } from "sonner";

export const handleFetchAffirmations = async () => {
    try {
        return await fetchAffirmations();
    } catch (error) {
        toast.error("Erreur lors de la récupération des affirmations.");
        console.error(error);
        return [];
    }
};

export const handleAddAffirmation = async (libelle: string, points: number) => {
    try {
        await addAffirmation(libelle, points);
        toast.success("Affirmation ajoutée !");
    } catch (error) {
        toast.error("Erreur lors de l'ajout de l'affirmation.");
        console.error(error);
    }
};

export const handleUpdateAffirmation = async (id: number, libelle: string, points: number) => {
    try {
        await updateAffirmation(id, libelle, points);
        toast.success("Affirmation mise à jour !");
    } catch (error) {
        toast.error("Erreur lors de la mise à jour de l'affirmation.");
        console.error(error);
    }
};

export const handleDeleteAffirmation = async (id: number) => {
    try {
        await deleteAffirmation(id);
        toast.success("Affirmation supprimée !");
    } catch (error) {
        toast.error("Erreur lors de la suppression de l'affirmation.");
        console.error(error);
    }
};
