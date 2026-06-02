import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlayerRepository, Player } from '@fifa-player-manager/domain';

@Injectable()
export class PrismaPlayerRepository implements PlayerRepository { //resolver nombre x repository
  constructor(private prisma: PrismaService) {}

  async save(createPlayerDto) {
    // this.prisma.players.
    return 'This action adds a new player' as unknown as Player;
  }

  async findMany({ skip }: { skip: number }) { //todo : arreglar o mejorar + esto puede ser undefined decidir quien se hace cargo el caso de uso o dar un result error o buscar convaores por defecto??
    const x = await this.prisma.players.findMany({ take: 4, skip });

    const players = x.map((x) => ({
      id: x.id,
      longName: x.long_name,
      clubName: x.club_name || "no-club",
      playerPositions: [x.player_positions as "GK"],
      nationality: x.nationality_name || "no-pais",
      overall: x.overall,
      clubPosition: "CB",
    } satisfies Player))

    return {
      data: players,
      total: players.length,
    };
  }

  async findOne(opts: { where: { id: number } }): Promise<Player | null> { //todo: corregir anidamientos y/o tipos
    const x = await this.prisma.players.findUnique({ where: { id: opts.where.id } });

    if (!x) return null;

    return {
      id: x.id, // todo: corregir tipos | null y nombre
      longName: x.long_name,
      clubName: x.club_name || "no-club",
      playerPositions: [x.player_positions as "GK"],
      clubPosition: "CB",
      nationality: x.nationality_name || "no-pais",
      overall: x.overall,
    } satisfies Player;
  }

  async update(opts): Promise<void> {
    return `This action updates a #${opts} player` as unknown as void;
  }

  async delete({ id }) {
    return `This action removes a #${id} player` as unknown as void;
  }
}
