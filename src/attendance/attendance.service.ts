import { Injectable } from '@nestjs/common';
import { Attendance, Period } from './attendance.dtos';

@Injectable()
export class AttendanceService {
    mapAttendanceData (dates: string[], records: string[]): Attendance[] {
        return records.map((record: string, index: number) => {
            return new Attendance(
                dates[index] || dates[index - 1], 
                record, 
                this.computePeriod(dates[index]),
            );
        });
    }

    private computePeriod (dateString: string): Period {
        if (dateString) {
            return this.isDateSaturday(dateString) ? Period.Morning : Period.Evening;
        }
        return Period.Evening;
    }

    private isDateSaturday (dateString: string) {
        return dateString.includes('Sat');
    }
}