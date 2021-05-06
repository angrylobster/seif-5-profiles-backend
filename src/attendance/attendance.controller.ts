import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SheetsService } from '../sheets/sheets.service';
import { Attendance } from './attendance.dtos';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
@UseGuards(JwtGuard)
export class AttendanceController {
    constructor (
        private readonly sheetsService: SheetsService,
        private readonly attendanceService: AttendanceService,
    ) {}

    @Get('')
    async getAllByStudent (@Request() req: ExpressRequest): Promise<Attendance[]> {
        const attendanceSheet = await this.sheetsService.getAttendanceSheet();
        const studentIndex = attendanceSheet.getEmails()
            .indexOf(req.user.email);
        if (studentIndex === -1) {
            throw new NotFoundException(`Could not find student with email ${req.user.email}`);
        }
        return this.attendanceService.mapAttendanceData(
            attendanceSheet.getAttendanceDates(),
            attendanceSheet.getAttendanceRecord(studentIndex),
        );
    } 
}