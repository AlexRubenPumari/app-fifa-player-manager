import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';//todo: elint ""

@Module({
  imports: [PlayersModule],
})
export class AppModule {}