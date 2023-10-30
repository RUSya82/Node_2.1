import { ExpressReturnType, IControllerRoute } from './route.interface';
import { CookieOptions, Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	// protected logger: LoggerService

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public created<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 201, message);
	}

	public setCookie(res: Response, token: string, value: string, options: CookieOptions): ExpressReturnType {
		return res.cookie(token, value, options);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] bind ${route.path}`);
			const middleware = route.middlewares?.map((e) => e.execute.bind(e)); //привязка к контексту
			const handler = route.func.bind(this); //привязка к контексту
			const pipeline = middleware ? [...middleware, handler] : handler; //собираем массив обработчиков
			this.router[route.method](route.path, pipeline);
		}
	}
}
