import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from './response.interfaces';

@Injectable()
export class ResponseInterceptor <T> implements NestInterceptor {
    intercept (context: ExecutionContext, next: CallHandler): Observable<HttpResponse<T>> {
        return next.handle()
            .pipe(
                map(data => {
                    return {
                        status: context.switchToHttp().getResponse().statusCode,
                        data: classToPlain(data),
                    } as HttpResponse<T>;
                }),
            );
    }
}