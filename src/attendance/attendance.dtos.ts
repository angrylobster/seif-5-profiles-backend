export enum Period {
    Morning = 'AM',
    Evening = 'PM',
}

export class Attendance {
    date: string;
    record: string;
    period: Period;

    constructor (
        date: string,
        record: string,
        period: Period,
    ) {
        this.date = date;
        this.record = record;
        this.period = period;
    }
}