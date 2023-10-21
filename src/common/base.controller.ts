import {LoggerService} from '../logger/logger.service';
import {IControllerRoute} from './route.interface';
import {Response, Router} from 'express';

export abstract class BaseController {
    private readonly _router: Router;
    // protected logger: LoggerService

    protected constructor(protected logger: LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    public setCookie(res: Response, token: string, value: string, options: Object) {
        return res.cookie(token, value, options);
    }


    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] bind ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}