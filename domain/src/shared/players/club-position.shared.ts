import { type PlayerPosition, playerPositions } from "./index.js";

export const clubPositions = [
  ...playerPositions,
  "LCB",
  "RCB",
  "LCM",
  "RCM",
  "LDM",
  "RDM",
  "LAM",
  "RAM",
  "LF",
  "RF",
  "LS",
  "RS",
  "SUB",
  "RES",
] as const;

export type ClubPosition = PlayerPosition | typeof clubPositions[number];