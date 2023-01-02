import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    // =====> uncomment when get permission by search user <====
    // private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const path = req.path.split('/');
    const prefix = path[1];
    // =====> uncomment when get permission by search user <====
    // const user = await this.usersService.findOne(parseInt(path[2]));
    // for (let i = 0; i < user.permission.length; i++) {
    //   if (user.permission[i] === prefix) {
    //     return next();
    //   }
    // }
    if (!req.headers.authorization) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: `Token Not Found`,
        error: 'Unauthorized',
      });
    }

    const token = req.headers.authorization.replace('Bearer ', '');
    const data: any = this.authService.decode(token);
    for (let i = 0; i < data.permission.length; i++) {
      if (data.permission[i] === prefix) {
        return next();
      }
    }

    return res.status(HttpStatus.UNAUTHORIZED).send({
      message: `you doesnt have permission to access ${prefix}`,
      error: 'Unauthorized',
    });
  }
}
