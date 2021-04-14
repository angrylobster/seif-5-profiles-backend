import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login (@Request() request) {
        return this.authService.login(request.user);
    }

    @UseGuards(JwtGuard)
    @Get('hello')
    getAuthorizedHello () {
        return 'hello';
    }
}