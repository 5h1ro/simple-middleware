import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(payload: CreateUserDto) {
    const { username, password, role, permission } = payload;
    const userCreated = await this.userRepository.save({
      username,
      password,
      role,
      permission,
    });

    return userCreated;
  }

  async findOne(id: number) {
    const data = await this.userRepository.findOne({ where: { id } });
    return {
      id: data.id,
      username: data.username,
      role: data.role,
      permission: data.permission,
    };
  }

  async getUser(username: string, password: string) {
    const data = await this.userRepository.findOne({
      where: { username, password },
    });
    return data;
  }
}
