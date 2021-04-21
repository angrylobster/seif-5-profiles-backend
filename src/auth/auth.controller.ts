import { Controller, Post, UseGuards, Request, Body, Get, Query, NotFoundException } from '@nestjs/common';
import { User } from '../users/users.entity';
import { ChangePasswordDto, ResetPasswordDto } from './auth.dtos';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login (@Request() request) {
        return this.authService.login(request.user);
    }

    @Post('reset-password')
    async resetPassword (@Body() dto: ResetPasswordDto): Promise<unknown> {
        const response = await this.authService.resetPassword(dto.email);
        return response;
    }

    @Get('change-password')
    async getChangePasswordDetails (@Query() changePasswordQuery: Pick<User, 'passwordResetId'>): Promise<Partial<User>> {
        const user = await this.authService.getChangePasswordDetails(changePasswordQuery);
        if (!user) throw new NotFoundException('Invalid change password id');
        return user;
    }

    @Post('change-password')
    changeUserPassword (@Body() changePasswordDto: ChangePasswordDto): Promise<User> {
        return this.authService.changePassword(changePasswordDto);
    }
}