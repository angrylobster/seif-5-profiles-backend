import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../users/users.entity';
import { SendInBlueTransporter } from './transporters/sendInBlue.transporter';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { UserNameDetails } from '../users/users.dtos';
import { ChangePasswordDto } from './auth.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User) private readonly usersRepository: MongoRepository<User>,
        private readonly jwtService: JwtService,
        private readonly sendInBlueTransporter: SendInBlueTransporter,
    ) {}

    async validateUser (email: string, password: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });
        if (!user) throw new BadRequestException('Invalid email');
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new BadRequestException('Invalid password');
        return user;
    }
    
    login (user: Partial<User>) {
        return this.jwtService.sign({
            email: user.email,
            name: user.name,
            readinessAssessment: user.readinessAssessment,
            enrollmentDate: user.enrollmentDate,
            githubHandle: user.githubHandle,
        });
    }

    async resetPassword (email: string) {
        const user = await this.usersRepository.findOne({ email });
        if (!user) throw new NotFoundException(`Could not find user with email ${email}`);
        const passwordResetId = v4();
        user.passwordResetId = passwordResetId;
        const updatedUser = await this.usersRepository.save(user);
        await this.sendInBlueTransporter.sendResetPasswordEmail(updatedUser);
        return user;
    }

    async getChangePasswordDetails (changePasswordQuery: Pick<User, 'passwordResetId'>): Promise<UserNameDetails> {
        const user = await this.usersRepository.findOne(changePasswordQuery);
        return plainToClass(UserNameDetails, user, { excludeExtraneousValues: true });
    }

    async changePassword (changePasswordDto: ChangePasswordDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(changePasswordDto.password, 10);
        const response = await this.usersRepository.findOneAndUpdate(
            { passwordResetId: changePasswordDto.passwordResetId },
            {
                $unset: { passwordResetId: '' },
                $set: { password: hashedPassword },
            },
        );
        return plainToClass(User, response.value, { excludeExtraneousValues: true });
    }
}
