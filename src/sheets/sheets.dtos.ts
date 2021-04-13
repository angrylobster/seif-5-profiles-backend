import { sheets_v4 } from 'googleapis';
import { flattenArray } from '../common/common.helpers';
import { NameDetails } from '../users/users.entity';
import { NamedRange } from './sheets.enum';

export class Homework {
    lesson: string;
    name: string;
    dueDate: string;
    isComplete: boolean;

    constructor (
        lesson: string,
        name: string,
        dueDate: string,
        isComplete: string,
    ) {
        this.lesson = lesson;
        this.name = name;
        this.dueDate = dueDate;
        if (isComplete === 'Y') this.isComplete = true;
        else if (isComplete === 'N') this.isComplete = false;
    }
}

export class HomeworkSheet implements sheets_v4.Schema$BatchGetValuesResponse {
    spreadsheetId?: string | null;
    valueRanges?: sheets_v4.Schema$ValueRange[];

    getEmails (): string[] {
        return this.getFlattenedColumnValues(NamedRange.StudentEmails);
    } 
    
    getFirstNames (): string[] {
        return this.getFlattenedColumnValues(NamedRange.StudentFirstNames);
    }

    getLastNames (): string[] {
        return this.getFlattenedColumnValues(NamedRange.StudentLastNames);
    }

    getLessons (): string[] {
        return this.getRowValues(NamedRange.HomeworkLessons, 0);
    }

    getHomeworkNames (): string[] {
        return this.getRowValues(NamedRange.HomeworkNames, 0);
    }

    getDueDates (): string[] {
        return this.getRowValues(NamedRange.HomeworkDueDates, 0);
    }

    getCompletion (index: number): string[] {
        return this.getRowValues(NamedRange.HomeworkCompletion, index);
    }

    private getFlattenedColumnValues (range: NamedRange) {
        const index = Object.values(NamedRange)
            .indexOf(range);
        return flattenArray(this.valueRanges[index].values);
    }

    private getRowValues (range: NamedRange, rowIndex?: number) {
        const index = Object.values(NamedRange)
            .indexOf(range);
        return this.valueRanges[index].values[rowIndex];
    }
}

export interface StudentHomework {
    name: NameDetails;
    email: string;
    homeworkHistory: Homework[];
}