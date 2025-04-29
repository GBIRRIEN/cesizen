import { DiagnosticResult } from "@/types";
import { fetchResultats, updateResultat, deleteResultat, addResultat } from "./service";

export const getResults = async (): Promise<DiagnosticResult[]> => {
  return await fetchResultats();
};

export const handleUpdateResult = async (result: DiagnosticResult): Promise<void> => {
  await updateResultat(result);
};

export const handleDeleteResult = async (id: number): Promise<void> => {
  await deleteResultat(id);
};

export const handleAddResult = async (newResult: { score_min: number, score_max: number, message: string }): Promise<void> => {
  await addResultat(newResult);
};
