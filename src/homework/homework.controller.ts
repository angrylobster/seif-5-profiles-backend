import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SheetsService } from '../sheets/sheets.service';
import { Homework } from './homework.dtos';

@Controller('homework')
@UseGuards(JwtGuard)
export class HomeworkController {
    constructor (private readonly sheetsService: SheetsService) {}
    @Get('')
    async getAllByStudent (@Request() req): Promise<Homework[]> {
        const homeworkSheet = await this.sheetsService.getHomeworkSheet();
        const names = homeworkSheet.getHomeworkNames();
        const lessons = homeworkSheet.getLessons();
        const dueDates = homeworkSheet.getDueDates();
        const emails = homeworkSheet.getEmails();
        const studentIndex = emails.indexOf(req.user.email);
        if (studentIndex === -1) {
            throw new NotFoundException(`Could not find student with email ${req.user.email}`);
        }
        const completionData = homeworkSheet.getCompletion(studentIndex);
        return lessons.map((lesson: string, index: number) => {
            return new Homework(
                names[index],
                lesson,
                dueDates[index],
                completionData[index],
            );
        });
    }
}