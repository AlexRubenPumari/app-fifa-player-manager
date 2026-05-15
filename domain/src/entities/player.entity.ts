import { Entity, ClubPosition, PlayerPosition } from "../shared/index";

export interface Player extends Entity {
  longName: string;
  clubName: string;
  clubPosition: ClubPosition;
  playerPositions: PlayerPosition[];
  overall: number;
  nationality: string;
}
