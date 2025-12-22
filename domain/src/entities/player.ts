import type { Entity } from "../helpers"

export interface Player extends Entity {
  fullName: string,
  nationality?: string, 
}