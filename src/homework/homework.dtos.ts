export class Homework {
    name: string;
    lesson: string;
    dueDate: string;
    completion?: string;

    constructor (
        name: string,
        lesson: string,
        dueDate: string,
        completion?: string,
    ) {
        this.name = name;
        this.lesson = lesson;
        this.dueDate = dueDate;
        this.completion = completion;
    }
}