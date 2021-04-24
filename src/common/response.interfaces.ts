export interface HttpResponse <T> {
    status: number;
    data: T;
}

export interface HttpExceptionResponseData {
    statusCode: number;
    message: string[];
    error: string;
}

export class HttpErrorResponse <T> {
    status: number;
    error: string;
    data: T;

    constructor (
        status: number,
        error: string,
        data: T,
    ) {
        this.status = status;
        this.error = error;
        this.data = data;
    }
}