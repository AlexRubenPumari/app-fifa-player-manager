import { Module } from '@nestjs/common';
import { PrismaPlayerRepository } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayersController],
  providers: [PrismaPlayerRepository],
})
export class PlayersModule {}
