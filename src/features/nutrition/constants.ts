import type { ValuesType } from "utility-types";

export const supplements = [
  "Protein",
  "VitaminA",
  "VitaminB",
  "VitaminC",
  "LecithinE",
  "Fibre",
  "CalMagD",
  "Probiotics",
  "Garlic",
  "Omega3",
  "DoubleX",
] as const;

export type SupplementType = ValuesType<typeof supplements>;
