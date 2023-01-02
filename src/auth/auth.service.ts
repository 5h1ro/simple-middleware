import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username, password);
    const payload = { id: user.id, permission: user.permission };
    return { token: this.jwtService.sign(payload) };
  }

  decode(token: string) {
    return this.jwtService.decode(token);
  }
}
