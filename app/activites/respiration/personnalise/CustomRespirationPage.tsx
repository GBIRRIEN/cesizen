"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { getNextPhase, getPhaseLabel } from "./controller";

export default function CustomRespirationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const inspiration = parseInt(searchParams.get("inspiration") || "0");
  const apnee = parseInt(searchParams.get("apnee") || "0");
  const expiration = parseInt(searchParams.get("expiration") || "0");
  const id = inspiration + apnee + expiration;

  const [phase, setPhase] = useState<"inspiration" | "apnee" | "expiration">("inspiration");
  const [timeLeft, setTimeLeft] = useState(inspiration);
  const [isRunning, setIsRunning] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        const { next, duration } = getNextPhase(phase, { id, inspiration, apnee, expiration });
        setPhase(next);
        return duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phase, inspiration, apnee, expiration]);

  const handleStart = () => {
    setPhase("inspiration");
    setTimeLeft(inspiration);
    setIsRunning(true);
    setHasStarted(true);
  };

  const handleStop = () => {
    setPhase("inspiration");
    setTimeLeft(inspiration);
    setIsRunning(false);
    setHasStarted(false);
  };

  if (inspiration <= 0 || expiration <= 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center space-y-6">
        <div className="mt-10 text-center text-red-500 font-bold">Paramètres invalides</div>
        <Button variant="outline" onClick={() => router.push("/activites/respiration")}>Revenir au choix</Button>
      </div>
    );
  }

  if (inspiration >= 20 || apnee >= 60 || expiration >= 30) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center space-y-6">
        <div className="mt-10 text-center text-red-500 font-bold">Durées trop grandes</div>
        <Button variant="outline" onClick={() => router.push("/activites/respiration")}>Revenir au choix</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center space-y-6">
      <h1 className="text-2xl font-bold">Exercice personnalisé</h1>
      <p className="text-lg text-muted-foreground">
        Inspiration : {inspiration}s - Apnée : {apnee}s - Expiration : {expiration}s
      </p>

      {hasStarted ? (
        <>
          <div className="text-5xl font-semibold mt-10">{getPhaseLabel(phase)}</div>
          <div className="text-[100px] font-bold">{timeLeft}</div>
          <Button variant="destructive" onClick={handleStop}>Arrêter l'exercice</Button>
        </>
      ) : (
        <Button className="bg-green-500 hover:bg-green-600" onClick={handleStart}>Démarrer</Button>
      )}

      <Button variant="outline" onClick={() => router.push("/activites/respiration")}>
        Revenir au choix
      </Button>
    </div>
  );
}