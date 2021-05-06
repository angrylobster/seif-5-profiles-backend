import { Module } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({
    controllers: [AttendanceController],
    providers: [SheetsService, AttendanceService],
})
export class AttendanceModule {}