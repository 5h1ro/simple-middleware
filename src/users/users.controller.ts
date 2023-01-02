import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  findOne(@Headers() headers: any) {
    if (!headers.authorization) {
      throw new BadRequestException('Authorization not found');
    }
    const token = headers.authorization.replace('Bearer ', '');
    const data: any = this.authService.decode(token);
    return this.usersService.findOne(data.id);
  }
}
