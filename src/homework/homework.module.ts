import { Module } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';
import { HomeworkController } from './homework.controller';

@Module({
    controllers: [HomeworkController],
    providers: [
        SheetsService,
    ],
})
export class HomeworkModule {}