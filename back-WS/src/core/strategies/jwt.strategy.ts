import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UsersService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    if (payload) {
      let user = null;
      if(payload.username) {
        user = await this.authService.findUser(payload.username);
      } else {
        user = await this.userService.findByUserId(payload.userId);
      }
      return user ? user : null;
    }
    return null;
  }
}