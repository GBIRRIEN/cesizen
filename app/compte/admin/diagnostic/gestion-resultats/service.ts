import { supabase } from "@/lib/supabase";
import { DiagnosticResult } from "@/types";

export const fetchResultats = async (): Promise<DiagnosticResult[]> => {
  const { data, error } = await supabase
    .from("diagnostic_results")
    .select("*")
    .order("score_min", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const updateResultat = async (result: DiagnosticResult): Promise<void> => {
  const { error } = await supabase
    .from("diagnostic_results")
    .update({
      score_min: result.score_min,
      score_max: result.score_max,
      message: result.message,
    })
    .eq("id", result.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteResultat = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from("diagnostic_results")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const addResultat = async (newResult: { score_min: number, score_max: number, message: string }): Promise<void> => {
  const { error } = await supabase
    .from("diagnostic_results")
    .insert([newResult]);

  if (error) {
    throw new Error(error.message);
  }
};
