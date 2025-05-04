"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/src/components/ui/button";
import { Phase, ExerciceRespiration } from "@/types";
import { fetchExerciceById } from "./service";
import { getNextPhase, getPhaseLabel } from "./controller";

export default function ExerciceRespirationPage() {
    const params = useParams();
    const router = useRouter();
    const [exercice, setExercice] = useState<ExerciceRespiration | null>(null)
    const [phase, setPhase] = useState<Phase>("inspiration");
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        const loadExercice = async () => {
            const data = await fetchExerciceById(params.id as string);
            if (data) {
                setExercice(data);
                setPhase("inspiration");
                setTimeLeft(data.inspiration!);
                setIsRunning(true);
            }
        };
        loadExercice();
    }, [params.id]);

    useEffect(() => {
        if (!isRunning || !exercice) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) return prev - 1;

                const { next, duration } = getNextPhase(phase, exercice);
                setPhase(next);
                return duration;
            });
        }, 1000);

        return () => clearInterval(timer)
    }, [isRunning, phase, exercice])

    const handleStart = () => {
        if (exercice) {
            setPhase("inspiration")
            setTimeLeft(exercice.inspiration!)
            setHasStarted(true)
            setIsRunning(true)
        }
    }

    const handleStop = () => {
        setIsRunning(false)
        setHasStarted(false)
        if (exercice) {
            setPhase("inspiration")
            setTimeLeft(exercice.inspiration!)
        }
    }

    if (!exercice) {
        return <div className="text-center mt-10">Chargement de l'exercice...</div>
    }

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center space-y-6">
            <h1 className="text-2xl font-bold">Exercice {exercice.id}</h1>
            <p className="text-lg text-muted-foreground">
                Inspiration : {exercice.inspiration}s - Apnée : {exercice.apnee}s - Expiration : {exercice.expiration}s
            </p>

            {hasStarted ? (
                <>
                    <div className="text-5xl font-semibold mt-10">{getPhaseLabel(phase)}</div>
                    <div data-testid="timer" className="text-[100px] font-bold">{timeLeft}</div>
                    <Button variant="destructive" onClick={handleStop}>
                        Arrêtez l'exercice
                    </Button>
                </>
            ) : (
                <Button onClick={handleStart} className="mt-8">
                    Démarrer l'exercice
                </Button>
            )}       
            <Button variant="outline" onClick={() => router.push("/activites/respiration")}>
                Revenir au choix
            </Button>
        </div>
    )
}