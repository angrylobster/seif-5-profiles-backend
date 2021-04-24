import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name, true);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                tap(data => {
                    const request = context.switchToHttp().getRequest();
                    this.logger.log(JSON.stringify({
                        ...data,
                        url: request.url,
                        method: request.method,
                    }));
                }),
            );
    }
}