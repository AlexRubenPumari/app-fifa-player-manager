import { schema } from "../core";

export const playerPositions = [
  "GK",
  "RB",
  "RWB",
  "CB",
  "LB",
  "LWB",
  "CDM",
  "CM",
  "CAM",
  "RM",
  "LM",
  "RW",
  "LW",
  "CF",
  "ST",
] as const;

export const playerPositionEnum = schema.enum(playerPositions);

export type PlayerPosition = typeof playerPositions[number];