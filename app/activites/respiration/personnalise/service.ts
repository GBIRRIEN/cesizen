export function getPhaseDuration(phase: "inspiration" | "apnee" | "expiration", durations: {
  id: number;
  inspiration: number;
  apnee: number;
  expiration: number;
}) {
  switch (phase) {
    case "inspiration": return durations.inspiration;
    case "apnee": return durations.apnee;
    case "expiration": return durations.expiration;
  }
}