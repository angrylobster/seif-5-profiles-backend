import { BadRequestException, Injectable } from '@nestjs/common';
import { Homework, HomeworkSheet, StudentHomework } from '../sheets/sheets.dtos';

@Injectable()
export class HomeworkService {
    async findStudentHomeworkByEmail (homeworkSheet: HomeworkSheet, email: string): Promise<StudentHomework> {
        const studentIndex = homeworkSheet.getEmails()
            .indexOf(email);
        if (studentIndex === -1) throw new BadRequestException(`Could not find email ${email}`);
        const lessons = homeworkSheet.getLessons();
        const homeworkNames = homeworkSheet.getHomeworkNames();
        const dueDates = homeworkSheet.getDueDates();
        const completion = homeworkSheet.getCompletion(studentIndex);

        return {
            name: {
                first: homeworkSheet.getFirstNames()[studentIndex],
                last: homeworkSheet.getLastNames()[studentIndex],
            },
            email,
            homeworkHistory: lessons.map((lesson: string, index: number) => {
                return new Homework(
                    lesson, 
                    homeworkNames[index], 
                    dueDates[index], 
                    completion[index],
                );
            }),
        } as StudentHomework;
    }
}
