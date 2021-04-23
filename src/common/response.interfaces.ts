export interface HttpResponse <T> {
    status: number;
    data: T;
}

export interface HttpExceptionResponse {
    statusCode: number;
    message: string[];
    error: string;
}