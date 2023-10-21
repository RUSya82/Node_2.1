import {Server} from 'node:http';
import express, {Express} from 'express';
import {LoggerService} from './logger/logger.service';
import {BaseController} from './common/base.controller';
import {ExceptionFilter} from './errors/exception.filter';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: BaseController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        userController: BaseController,
        exceptionFilter: ExceptionFilter
    ) {
        this.port = 8000;
        this.app = express();
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    userRouters() {
        this.app.use('/users', this.userController.router);
    }
    useExceptionFilters(){
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.userRouters();
        this.useExceptionFilters()
        this.server = this.app.listen(this.port);
        this.logger.log(`Server started at port ${this.port}`);
    }

}