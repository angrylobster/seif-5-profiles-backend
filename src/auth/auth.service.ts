import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async validateUser (email: string, password: string): Promise<User> {
        return await this.usersRepository.findOne({ email, password });
    }
    
    login (user: Partial<User>) {
        return this.jwtService.sign({ email: user.email, name: user.name });
    }

    async resetPassword (email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (!user) throw new NotFoundException(`Could not find user with email ${email}`);
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            requireTLS: false,
            auth: {
                user: 'liewminshan@gmail.com',
                pass: 'Cbh6T1zmwvScWUO8',
            },
        });
        const sentEmail = await transporter.sendMail({
            from: 'sgseif5@gmail.com',
            to: user.email,
            subject: 'Reset password',
            text: 'Hey, you reset your password',
        });

        console.log(sentEmail.messageId);
        
        return user;
    }
}
