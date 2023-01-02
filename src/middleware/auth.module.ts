import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthMiddleware } from './auth.middleware';
@Module({
  imports: [AuthModule],
  controllers: [AuthMiddleware],
  providers: [UsersService],
})
export class AuthModule {}
