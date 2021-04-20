import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ResetPasswordDto } from './auth.dtos';
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
}