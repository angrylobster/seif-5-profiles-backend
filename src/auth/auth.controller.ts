import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    login (@Request() request) {
        console.log(request.user);
        return this.authService.login(request.user);
    }
}