import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

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
        return { access_token: this.jwtService.sign({ email: user.email, sub: user._id }) };
    }
}
