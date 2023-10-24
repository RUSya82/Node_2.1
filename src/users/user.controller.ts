import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';


@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}
	login(req: Request<{},{},UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		// next(new HttpError(401, 'не очень авторизован', 'login'));
		this.setCookie(res, 'token', 'a64c6541654db5699cad', {
		    secure: true,
		    domain: '/'
		});
		this.loggerService.log(`Route /login`);
		this.ok(res, 'login');
	}
	register(req: Request<{},{},UserRegisterDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.loggerService.log(`Route /register`);
		this.created(res);
	}
}
