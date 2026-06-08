import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';//todo: elint ""
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [PlayersModule, AuthModule],
})
export class AppModule {}