import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HttpExceptionResponse } from './response.interfaces';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
    catch (exception: HttpException | Error, host: ArgumentsHost) {
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const response = exception instanceof HttpException ? (exception as HttpException).getResponse() as HttpExceptionResponse : null;
        const error = response ? response.error : HttpErrorByCode[status];
        const message = response ? response.message : (exception as Error).message;
        host.switchToHttp()
            .getResponse()
            .status(status)
            .json({
                status,
                error,
                data: message,
            });
    }
}