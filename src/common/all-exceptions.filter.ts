import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { HttpErrorResponse, HttpExceptionResponseData } from './response.interfaces';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name, true);

    catch (exception: HttpException | Error, host: ArgumentsHost) {
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const response = exception instanceof HttpException ? (exception as HttpException).getResponse() as HttpExceptionResponseData : null;
        const error = response ? response.error : HttpErrorByCode[status];
        const message = response ? response.message : (exception as Error).message;

        const request = host.switchToHttp()
            .getRequest<{ url: string; method: string }>();
        const httpErrorResponse = new HttpErrorResponse<string | string[]>(status, error, message);
        
        this.logError(request, httpErrorResponse);

        host.switchToHttp()
            .getResponse()
            .status(status)
            .json(httpErrorResponse);
    }

    logError (request: { url: string; method: string }, errorResponse: HttpErrorResponse<string | string[]>): void {
        this.logger.error(JSON.stringify({ 
            ...errorResponse,
            url: request.url,
            method: request.method,
        }));
    }
}