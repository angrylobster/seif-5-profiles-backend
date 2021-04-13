import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { SheetsService } from '../sheets/sheets.service';

@Module({
    controllers: [HomeworkController],
    providers: [
        HomeworkService,
        SheetsService,
    ],
})
export class HomeworkModule {}
