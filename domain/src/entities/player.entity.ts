import { Entity } from "../shared/entity.shared";
import { ClubPosition } from "../shared/club-position.shared";
import { PlayerPosition } from "../shared/player-position.shared";

export interface Player extends Entity {
  longName: string;
  clubName: string;
  clubPosition: ClubPosition;
  playerPositions: PlayerPosition[];
  overall: number;
  nationality: string;
}
