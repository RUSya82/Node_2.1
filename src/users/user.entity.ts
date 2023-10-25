import { hash } from 'bcryptjs';

export class User {

	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _username: string,
	) {
	}

	get username(): string {
		return this._username;
	}

	get email(): string {
		return this._email;
	}

	get password() {
		return this._password;
	}

	public async setPassword(value: string): Promise<void> {
		this._password = await hash(value, 10);
	}
}