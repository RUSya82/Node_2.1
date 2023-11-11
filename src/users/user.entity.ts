import { hash, compare } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _username: string,
		passwordHash?: string
	) {
		if(passwordHash){
			this._password = passwordHash;
		}
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

	public async setPassword(value: string, salt: number): Promise<void> {
		this._password = await hash(value, Number(salt));
	}

	public async comparePassword(pass: string): Promise<boolean>{
		return compare(pass, this.password)
	}
}
