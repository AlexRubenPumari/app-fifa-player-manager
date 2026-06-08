import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly user = {
    username: 'admin',
    password: '1234',
  };

  validateUser(username: string, password: string) {
    return username === this.user.username && password === this.user.password;
  }

  login(username: string, password: string) {
    const valid = this.validateUser(username, password);

    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username };

    return {
      token: this.jwtService.sign(payload), //todo: arreglar
    };
  }
}
