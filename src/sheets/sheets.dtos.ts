import { sheets_v4 } from 'googleapis';
import { flattenArray } from '../common/common.helpers';
import { NamedRange } from './sheets.enum';

export abstract class SheetDto implements sheets_v4.Schema$BatchGetValuesResponse  {
    spreadsheetId?: string | null;
    valueRanges?: sheets_v4.Schema$ValueRange[];

    protected getFlattenedColumnValues (ranges: NamedRange[], range: NamedRange) {
        const index = ranges.indexOf(range);
        return flattenArray(this.valueRanges[index].values);
    }

    protected getRowValues (ranges: NamedRange[], range: NamedRange, rowIndex: number) {
        const index = ranges.indexOf(range);
        return this.valueRanges[index].values[rowIndex];
    }
}

export class SheetHomework extends SheetDto {
    static readonly NamedRanges = [
        NamedRange.HomeworkEmails,
        NamedRange.StudentFirstNames,
        NamedRange.StudentLastNames,
        NamedRange.HomeworkLessons,
        NamedRange.HomeworkNames,
        NamedRange.HomeworkDueDates,
        NamedRange.HomeworkCompletion,
    ];

    getEmails (): string[] {
        return this.getFlattenedColumnValues(SheetHomework.NamedRanges, NamedRange.HomeworkEmails);
    } 
    
    getFirstNames (): string[] {
        return this.getFlattenedColumnValues(SheetHomework.NamedRanges, NamedRange.StudentFirstNames);
    }

    getLastNames (): string[] {
        return this.getFlattenedColumnValues(SheetHomework.NamedRanges, NamedRange.StudentLastNames);
    }

    getLessons (): string[] {
        return this.getRowValues(SheetHomework.NamedRanges, NamedRange.HomeworkLessons, 0);
    }

    getHomeworkNames (): string[] {
        return this.getRowValues(SheetHomework.NamedRanges, NamedRange.HomeworkNames, 0);
    }

    getDueDates (): string[] {
        return this.getRowValues(SheetHomework.NamedRanges, NamedRange.HomeworkDueDates, 0);
    }

    getCompletion (index: number): string[] {
        return this.getRowValues(SheetHomework.NamedRanges, NamedRange.HomeworkCompletion, index);
    }
}

export class SheetAttendance extends SheetDto {
    static readonly NamedRanges = [
        NamedRange.AttendanceDates,
        NamedRange.AttendanceEmails, 
        NamedRange.AttendanceRecords,
    ];

    getEmails (): string[] {
        return this.getFlattenedColumnValues(SheetAttendance.NamedRanges, NamedRange.AttendanceEmails);
    } 

    getAttendanceRecord (index: number): string[] {
        return this.getRowValues(SheetAttendance.NamedRanges, NamedRange.AttendanceRecords, index);
    }

    getAttendanceDates (): string[] {
        return this.getRowValues(SheetAttendance.NamedRanges, NamedRange.AttendanceDates, 0);
    }
}