import { IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleDto } from '../dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z ]+$/)
  @Column()
  username: string;
  @IsNotEmpty()
  @MinLength(5)
  @Column()
  password: string;
  @Column()
  role: RoleDto;
  @Column('simple-array')
  permission: string[];
}
