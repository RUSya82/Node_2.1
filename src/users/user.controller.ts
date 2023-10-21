import {BaseController} from '../common/base.controller';
import {NextFunction, Request, Response} from 'express';
import {LoggerService} from '../logger/logger.service';
import {HttpError} from '../errors/http-error.class';

export class UserController extends BaseController{
    constructor(logger: LoggerService) {
        super(logger);
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
        this.logger.log(`Route /register`);
        this.created(res);
    }
}