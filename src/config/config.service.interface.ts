export interface IConfigService {
	get: <T extends string | number> (Key: string) => T;
}