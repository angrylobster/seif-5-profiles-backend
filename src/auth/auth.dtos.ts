import { IsString, IsUUID } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    email: string;
}

export class ChangePasswordDto {
    @IsString()
    @IsUUID(4)
    passwordResetId: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
}