import { Token, TokenDocument } from './schemas/token.schema';
import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { UserSource } from 'src/users/schemas/user.schema';
import { cp } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
        private configService: ConfigService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {        
        const user = await this.usersService.findOne(username, true);        
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password ?? '');
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async validateSocialUser(userId: string): Promise<any> {
        const user = await this.usersService.findByUserId(userId);
        if (user) {
            return user
        }
        return null;
    }

    async findUser(username: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        return user ? user : null;
    }

    async login(user: any) {        
        const dbUser = await this.usersService.findByEmail(user.username);

        // Workaround ::: cast to plain text object
        const payload = JSON.parse(JSON.stringify(dbUser));
        return {
            ...payload,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        try {
            return await this.usersService.register(createUserDto);
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }

    async profile(user: any) {
        return user;
    }

    /**
     * Update user password
     * @param user 
     * @param data 
     */
    async changePassword(loggedUser: any, data: ChangePasswordDto) {
        const res = await this.validateUser(loggedUser.username, data.password);
        if (!res) {
            throw new UnauthorizedException({
                message: 'Nom d\'utilisateur ou mot de passe incorrecte.'
            });
        }
        return await this.usersService.updatePassword(loggedUser, data.newPassword);
    }

    async resetPasswordByGeneration(email: any) {
        const user = await this.usersService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException({
                message: 'Nom d\'utilisateur ou mot de passe incorrecte.'
            });
        }

        if (
            [
                UserSource.APPLE_USER,
                UserSource.GOOGLE_USER,
                UserSource.FB_USER,
            ].includes(user.source)
        ) {
            throw new UnauthorizedException({
                message: 'Action non authorisé pour ce type de compte.'
            });
        }

        let length = 8;
        let charset = "abcdefg0123456789@#&*ABCDEFG";
        let password = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }

        try {
            const result = await this.mailService.sendResetPassport(user, password)
            console.log('reset password -> ', result);
        } catch (error) {
            console.error('reset password -> ', error)
        }
        return await this.usersService.updatePassword(user, password)
    }

    async generateTokens(payload: any) {
        const accessToken: Token = {
            userId: payload.userId,
            id: await this.jwtService.signAsync(payload),
            issuedAt: new Date(),
            expiresAt: new Date(),
        }

        const refreshToken: Token = {
            userId: payload.userId,
            id: await this.jwtService.signAsync({
                id: accessToken.id
            }, {
                expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
                secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY')
            }),
            issuedAt: new Date(),
            expiresAt: new Date(),
        }

        const { id, ...result } = await this.tokenModel.create({
            ...refreshToken
        })

        return { accessToken, refreshToken: id }
    }

}

