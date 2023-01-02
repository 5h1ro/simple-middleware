export enum RoleDto {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  username: string;
  password: string;
  role: RoleDto;
  permission: string[];
}
