import { Server } from 'node:http';
import express, { Express } from 'express';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IExceptionFilter } from './errors/exception.filter.interface';
// import {json} from 'body-parser'; - в 3 версии этого не было и нужна была эта библиотека

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.port = 8000;
		this.app = express();
	}
	useMiddleware() {
		this.app.use(express.json());
	}
	userRouters(): void {
		this.app.use('/users', this.userController.router);
	}
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.userRouters();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Server started at port ${this.port}`);
	}
}
