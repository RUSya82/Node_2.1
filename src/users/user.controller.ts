import {BaseController} from '../common/base.controller';
import {NextFunction, Request, Response} from 'express';
import {LoggerService} from '../logger/logger.service';
import {HttpError} from '../errors/http-error.class';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {ILogger} from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController{
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger
    ){
        super(loggerService);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login
            },
            {
                path: '/register',
                method: 'post',
                func: this.register
            }
        ])
    }
    login(req: Request, res: Response, next: NextFunction){
        next(new HttpError(401, 'не авторизован', 'login'));
        // this.setCookie(res, 'token', 'a64c6541654db5699cad', {
        //     secure: true,
        //     domain: '/'
        // });
        // this.logger.log(`Route /login`);
        // this.ok(res, 'login');
    }
    register(req: Request, res: Response, next: NextFunction){
        this.loggerService.log(`Route /register`);
        this.created(res);
    }
}