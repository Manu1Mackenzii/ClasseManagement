import {
    Body, Controller,
    Get, HttpCode,
    HttpStatus, Post, Put, Request, Res, UnauthorizedException, UseGuards
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetpassworrd.dto';

@Controller('')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() req: LoginDto, @Res() res: Response) {
       const {access_token}  =  await this.authService.login(req);
        return res.status(HttpStatus.OK).json({payload : {}, success: true,  access_token: access_token});
    }

    @Post('auth/register')
    async create(@Body() userDto: CreateUserDto,  @Res() res: Response) {
      const  user = await this.authService.register(userDto);
      return res.status(HttpStatus.OK).json({payload : user, success: true});
    }

    @Post('auth/social')
    async socialLogin(@Body() data: any) {
        const { userId } = data
        const user = await this.authService.validateSocialUser(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user._doc);
    }

    @Post('auth/tokens')
    async refreshToken(@Body() data: any) {
        const { userId } = data
        const user = await this.authService.validateSocialUser(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user._doc);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.profile(req.user);
    }

    /**
     * Change password
     */
    @UseGuards(JwtAuthGuard)
    @Put('auth/change/password')
    changePassword(@Request() req, @Body() changePassword: ChangePasswordDto) {
        return this.authService.changePassword(req.user, changePassword);
    }

    /**
     * Reset password by generating password
     */
    @Post('auth/password/reset/generated')
    resetPasswordByGenereated(@Request() req, @Body() body: ResetPasswordDto) {
        return this.authService.resetPasswordByGeneration(body.email);
    }
}
