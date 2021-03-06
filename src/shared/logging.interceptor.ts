/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Logger } from "@nestjs/common/services/logger.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept (
        context: ExecutionContext,
        call$: Observable<any>
    ): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        return call$.pipe(
            tap(() =>
                Logger.log(`${method} ${Date.now() - now}ms `,
                    context.getClass().name
                ))
        );
    }

}