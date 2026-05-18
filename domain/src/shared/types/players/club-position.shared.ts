import { PlayerPosition } from "./player-position.shared";

export type ClubPosition =
  | PlayerPosition
  | "LCB"
  | "RCB"
  | "LCM"
  | "RCM"
  | "LDM"
  | "RDM"
  | "LAM"
  | "RAM"
  | "LF"
  | "RF"
  | "LS"
  | "RS"
  | "SUB"
  | "RES";
