import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { UserModel } from '.prisma/client';
import { IUsersRepository } from './user.repository.interface';

@injectable()
export class UserService implements IUserService {

	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, username, password }: UserRegisterDto): Promise<UserModel  | null> {
		const newUser = new User(email, username);
		const salt = this.configService.get<number>('SALT')
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}
	async validateUser({email, password}: UserLoginDto): Promise<boolean> {
		const existedUser: UserModel | null = await this.usersRepository.find(email);

		if(!existedUser){
			return false;
		}
		const newUser = new User(existedUser.email, existedUser.username, existedUser.password);
		return newUser.comparePassword(password);
	}
}
