import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger,) {
		const result: DotenvConfigOutput = config();
		if(result.error) {
			this.loggerService.error("[ConfigService] Can't read file .env")
		} else {
			this.loggerService.log("[ConfigService] Config loaded!");
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends string | number>(key: string) {
		return this.config[key] as T;
	}
}