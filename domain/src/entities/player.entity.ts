import type { Entity, ClubPosition, PlayerPosition } from "../shared/index.js";

export interface Player extends Entity {
  longName: string;
  clubName: string;
  clubPosition: ClubPosition;
  playerPositions: PlayerPosition[];
  overall: number;
  nationality: string;
}