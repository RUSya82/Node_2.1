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

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
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
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
