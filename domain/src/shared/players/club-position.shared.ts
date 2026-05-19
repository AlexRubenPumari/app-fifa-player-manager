import { schema } from "../core";
import { PlayerPosition, playerPositions } from "./index";

const clubPositions = [
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

export const clubPositionEnum = schema.enum(clubPositions);

export type ClubPosition = PlayerPosition | typeof clubPositions[number];