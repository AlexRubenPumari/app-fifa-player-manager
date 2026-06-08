import type { Player } from "../entities/index.js";
import type { Repository } from "../shared/index.js";

export interface PlayerRepository extends Repository<Player> {};//todo el modulo se llaama players o player
