import {NextFunction, Request, Response} from 'express';
import {LoggerService} from '../logger/logger.service';
import {IExceptionFilter} from './exception.filter.interface';
import {HttpError} from './http-error.class';

export class ExceptionFilter implements IExceptionFilter{
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if(error instanceof HttpError){
            this.logger.error(`[${error.context}] ERROR: ${error.statusCode} - ${error.message}`);
            res.status(error.statusCode).send({err: error.message});
        } else {
            this.logger.error(`${error.message}`);
            res.status(500).send({err: error.message});
        }

    }
}