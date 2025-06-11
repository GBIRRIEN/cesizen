import { getPhaseDuration } from "./service";

export function getNextPhase(current: "inspiration" | "apnee" | "expiration", durations: {
  id: number;
  inspiration: number;
  apnee: number;
  expiration: number;
}) {
  let next: "inspiration" | "apnee" | "expiration" = "inspiration";
  if (current === "inspiration") next = durations.apnee > 0 ? "apnee" : "expiration";
  else if (current === "apnee") next = "expiration";
  else next = "inspiration";

  return { next, duration: getPhaseDuration(next, durations) };
}

export function getPhaseLabel(phase: "inspiration" | "apnee" | "expiration") {
  switch (phase) {
    case "inspiration": return "Inspirez";
    case "apnee": return "Apnée";
    case "expiration": return "Expirez";
  }
}