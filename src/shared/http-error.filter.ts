/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Logger } from "@nestjs/common/services/logger.service";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch (exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        }
        Logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter')
        response.status(status).json(errorResponse);
    }

}