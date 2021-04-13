import { Controller, Get } from '@nestjs/common';
import { SheetsService } from '../sheets/sheets.service';
import { HomeworkService } from './homework.service';

@Controller('homework')
export class HomeworkController {
    constructor(
        private readonly homeworkService: HomeworkService,
        private readonly sheetsService: SheetsService,
    ) {}

    @Get()
    async findHomeworkDetailsByEmail () {
        const homeworkSheet = await this.sheetsService.getHomeworkSheet();
        return this.homeworkService.findStudentHomeworkByEmail(homeworkSheet, 'lucases.seet@gmail.com');
    }
}
