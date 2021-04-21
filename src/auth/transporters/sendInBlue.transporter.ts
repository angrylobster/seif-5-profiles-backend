import { HttpService, Injectable } from '@nestjs/common';
import { User } from '../../users/users.entity';
import { SendInBluePayload, SendInBlueSuccessResponse } from './sendInBlue.interfaces';

@Injectable()
export class SendInBlueTransporter { 
    private static readonly PATH_TRANSACTIONAL_EMAIL = 'v3/smtp/email';
    private static readonly RESET_EMAIL_TEMPLATE_ID = 1;

    constructor (private readonly httpService: HttpService) {}

    async sendResetPasswordEmail (user: User): Promise<SendInBlueSuccessResponse> {
        const successResponse = await this.httpService.post<SendInBlueSuccessResponse>(
            SendInBlueTransporter.PATH_TRANSACTIONAL_EMAIL,
            {
                templateId: SendInBlueTransporter.RESET_EMAIL_TEMPLATE_ID,
                params: {
                    FIRSTNAME: user.name.first,
                    LASTNAME: user.name.last,
                    PASSWORD_RESET_LINK: `${process.env.FRONTEND_URL}/change-password?id=${user.passwordResetId}`,
                },
                to: [
                    {
                        name: user.fullName,
                        email: user.email,
                    },
                ],
            } as SendInBluePayload,
        ).toPromise();
        return successResponse.data;
    }
}