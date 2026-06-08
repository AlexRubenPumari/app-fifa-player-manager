import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { getEnv } from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: getEnv('ACCESS_TOKEN_SECRET'), //todo: cambiar x el env service q tenemos
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
