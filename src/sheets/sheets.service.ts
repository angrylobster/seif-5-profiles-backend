import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JWTOptions } from 'google-auth-library';
import { sheets_v4 } from 'googleapis';
import { JWT } from 'googleapis-common';
import { SheetAttendance, SheetHomework } from './sheets.dtos';

@Injectable() 
export class SheetsService {
    private jwtClient: JWT;

    async getHomeworkSheet (): Promise<SheetHomework> {
        await this.authorize();
        const spreadsheetValues = new sheets_v4.Resource$Spreadsheets$Values({ _options: { auth: this.jwtClient } });
        const { data } = await spreadsheetValues.batchGet({ 
            ranges: SheetHomework.NamedRanges,
            spreadsheetId: process.env.SPREADSHEET_COURSE_TRACKER_ID, 
        });
        return plainToClass(SheetHomework, data);
    }

    async getAttendanceSheet (): Promise<SheetAttendance> {
        await this.authorize();
        const spreadsheetValues = new sheets_v4.Resource$Spreadsheets$Values({ _options: { auth: this.jwtClient } });
        const { data } = await spreadsheetValues.batchGet({
            ranges: SheetAttendance.NamedRanges,
            spreadsheetId: process.env.SPREADSHEET_COURSE_TRACKER_ID,
        });
        return plainToClass(SheetAttendance, data);
    }

    private async authorize (): Promise<void> {
        if (!this.jwtClient) {
            this.jwtClient = new JWT({
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
                scopes: [process.env.GOOGLE_SHEETS_SCOPE],
            } as JWTOptions );
        }
        await this.jwtClient.getAccessToken();
    }
}