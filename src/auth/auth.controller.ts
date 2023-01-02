import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto): Promise<any> {
    const { username, password } = loginDto;
    const data = await this.authService.login(username, password);
    return data;
  }
}
