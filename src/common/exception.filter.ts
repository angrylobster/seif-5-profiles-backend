import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const exceptionName = exception instanceof HttpException
            ? (exception.getResponse() as any).error
            : 'InternalServerError';
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        host.switchToHttp()
            .getResponse()
            .status(status)
            .json({
                status,
                error: exceptionName,
                data: exception.message,
            });
    }
}