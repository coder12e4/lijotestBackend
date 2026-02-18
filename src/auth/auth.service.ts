import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
