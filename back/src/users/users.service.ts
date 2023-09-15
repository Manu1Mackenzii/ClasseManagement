import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from "mongoose";
import { Model } from 'mongoose';
import { SvcService } from 'src/user-services/service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserSource } from './schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        // private svcService: SvcService
        ) { }

        
    findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    findOne(username: string, selectPassword = false): Promise<User | undefined> {
        if (selectPassword) {
            return this.userModel.findOne({ email: username }).select('+password').exec();
        } else {
            return this.userModel.findOne({ email: username }).exec();
        }
    }

    findByUserId(userId: string): Promise<User | undefined> {
        return this.userModel.findOne({ userId }, {_id: 0, __v: 0}).exec();
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }, {_id: 0, __v: 0}).exec();
    }

    async register(createUserDto: CreateUserDto) {
        switch (createUserDto.source) {
            case UserSource.APPLE_USER:
            case UserSource.GOOGLE_USER:
            case UserSource.FB_USER:
                return this.createSocialUser(createUserDto)
            case UserSource.MOBILE_USER:
            case UserSource.GOLDEN_USER:
                return this.createUser(createUserDto);
            default:
            throw new UnauthorizedException({
                message: 'User source is not accepted'
            });
        }
    }

    async update(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findOne({ userId }).exec();
        if(updateUserDto.email && updateUserDto.email !== user.email) {
            let userFound = await this.userModel.findOne({ email: updateUserDto.email });
            if (userFound && userFound.userId !== userId) {
                throw new UnauthorizedException({
                    message: 'User already exists with same email or username'
                });
            }
            updateUserDto['username'] = updateUserDto.email
        }
        return this.userModel.findOneAndUpdate({ userId }, {
            ...updateUserDto,
            updatedAt: Date.now()
        }, {
            new: true
        }).exec();
    }

    async updatePassword(loggedUser: any, newPassword: string) {
        const toUpdate = {
            password: await bcrypt.hash(newPassword, 10)
        };
        const res = await this.userModel.findOneAndUpdate(
            { username: loggedUser.username }, 
            {
                ...toUpdate,
                updatedAt: Date.now()
            }
        ).exec();
        
        return res;
    }

    async remove(id: string) {
        const user = await this.userModel.findOne({userId: id})
        if (!user) {
            throw new NotFoundException({
                message: 'User does not exist'
            })
        }
        await this.userModel.deleteOne({userId: id}).exec();
        // await this.svcService.removeAllByUser(id)
    }


    private async createUser(createUserDto: CreateUserDto) {

        let userFound = await this.userModel.findOne({ email: createUserDto.email });

        if (userFound) {
            throw new UnauthorizedException({
                message: 'User already exists with same email or username'
            });
        } else {
            // let length = 8;
            // let charset = "abcdefg0123456789@#&*ABCDEFG";
            // let pwd = '';
            // for (var i = 0, n = charset.length; i < length; ++i) {
            //     pwd += charset.charAt(Math.floor(Math.random() * n));
            // }
            // createUserDto.password = pwd
            // console.log(pwd);
            
            const password =  await bcrypt.hash(createUserDto.password, 10);
            let userCreate: CreateUserDto = {
                ...createUserDto,
                userId: new mongoose.Types.ObjectId,
                email: createUserDto.email,
                username: createUserDto.email,
                lastName: '',
                firstName: '',
                password: password,
                profileCompleted: false,
                emailVerified: false
            }
            let user = await this.userModel.create({
                ...userCreate,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            return this.findByUserId(user.userId);
        }
    }

    private async createSocialUser(createUserDto: CreateUserDto) {
        if(!createUserDto.userId) {
            throw new BadRequestException({
                message: 'userId is required'
            });
        }

        let userFound = await this.userModel.findOne<User>({ email: createUserDto.email });

        if (userFound) {
            if(
                userFound.userId !== createUserDto.userId
                || userFound.source !== createUserDto.source
            ) {
                throw new UnauthorizedException({
                    message: 'User already exists with same email'
                });
            }
            return userFound
        } else {
            let user = await this.userModel.create({
                ...createUserDto
            });
            return user;
        }
    }

    isProfileCompleted(user) {
        if (!user.firstName || !user.lastName) {
            return false;
        }
        return true;
    }
}
