"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Plus, Save, Trash2 } from "lucide-react";

type ResultMessage = {
  id: number;
  score_min: number;
  score_max: number;
  message: string;
};

export default function GestionResultats() {
  const [resultats, setResultats] = useState<ResultMessage[]>([]);
  const [newResult, setNewResult] = useState({
    score_min: 0,
    score_max: 0,
    message: "",
  });

  const fetchResultats = async () => {
    const { data, error } = await supabase
      .from("diagnostic_results")
      .select("*")
      .order("score_min", { ascending: false });

    if (!error && data) setResultats(data);
  };

  useEffect(() => {
    fetchResultats();
  }, []);

  const handleUpdate = async (result: ResultMessage) => {
    await supabase
      .from("diagnostic_results")
      .update({
        score_min: result.score_min,
        score_max: result.score_max,
        message: result.message,
      })
      .eq("id", result.id);
    fetchResultats();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("diagnostic_results").delete().eq("id", id);
    fetchResultats();
  };

  const handleAdd = async () => {
    await supabase.from("diagnostic_results").insert([newResult]);
    setNewResult({ score_min: 0, score_max: 0, message: "" });
    fetchResultats();
  };

  const updateField = (id: number, field: keyof ResultMessage, value: string | number) => {
    setResultats((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, [field]: field === "message" ? value : Number(value) } : r
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Configuration des messages de diagnostic</h1>

      <Card>
        <CardContent className="p-4 space-y-4">
          {resultats.map((res) => (
            <div key={res.id} className="grid md:grid-cols-6 gap-2 items-center">
              <div>
                <Input
                  type="number"
                  value={res.score_min}
                  onChange={(e) => updateField(res.id, "score_min", e.target.value)}
                />
                <span className="text-xs text-muted-foreground">Score minimum</span>
              </div>
              <div>
                <Input
                  type="number"
                  value={res.score_max}
                  onChange={(e) => updateField(res.id, "score_max", e.target.value)}
                />
                <span className="text-xs text-muted-foreground">Score maximum</span>
              </div>
              <Textarea
                value={res.message}
                onChange={(e) => updateField(res.id, "message", e.target.value)}
                className="md:col-span-2"
              />
              <div className="flex space-x-2">
                <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleUpdate(res)} size="icon">
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(res.id)} size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="font-semibold">Ajouter une plage de résultat</h2>
          <div className="grid md:grid-cols-6 gap-2 items-center">
            <div>
              <Input
                type="number"
                value={newResult.score_min}
                onChange={(e) => setNewResult({ ...newResult, score_min: Number(e.target.value) })}
                placeholder="Score min"
              />
              <span className="text-xs text-muted-foreground">Score minimum</span>
            </div>
            <div>
              <Input
                type="number"
                value={newResult.score_max}
                onChange={(e) => setNewResult({ ...newResult, score_max: Number(e.target.value) })}
                placeholder="Score max"
              />
              <span className="text-xs text-muted-foreground">Score maximum</span>
            </div>
            <Textarea
              value={newResult.message}
              onChange={(e) => setNewResult({ ...newResult, message: e.target.value })}
              placeholder="Message"
              className="md:col-span-2"
            />
            <Button onClick={handleAdd} className="md:col-span-2 bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" /> Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}