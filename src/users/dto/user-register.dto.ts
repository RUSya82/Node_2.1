import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserRegisterDto{

	@MinLength(3, {message: 'Имя не может быть короче 3 символов'})
	@IsString({ message: 'Не указан пароль' })
	username: string;


	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@MinLength(8, {message: 'Пароль не может быть короче 8 символов'})
	@IsString({ message: 'Не указан пароль' })
	password: string;
}