export class Homework {
    name: string;
    lesson: string;
    dueDate: string;

    constructor (
        name: string,
        lesson: string,
        dueDate: string,
    ) {
        this.name = name;
        this.lesson = lesson;
        this.dueDate = dueDate;
    }
}