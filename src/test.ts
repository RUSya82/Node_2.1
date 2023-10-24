function Component(id: number, name: string): Function {
	console.log('init component');
	return (target: Function) => {
		console.log('run component');
		target.prototype.id = id;
		target.prototype.name = name;
		target.prototype.getName = (): string => {
			return target.prototype.name;
		};
		console.log(target.prototype.getName());
	};
}

function Logger(): Function {
	console.log('init logger');
	return (target: Function) => {
		console.log('run logger');
	};
}

function Property(target: Object, propertyKey: string): void {
	let value: number;

	const getter = (): number => {
		console.log('Get');
		return value * 10;
	};

	const setter = (newValue: number): void => {
		console.log('Set');
		value = newValue;
	};
	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

@Logger()
@Component(1, 'Anton')
export class User {
	@Property id: number;

	updateId(newId: number): number {
		return (this.id = newId);
	}
}
const user = new User();
user.id = 158;
console.dir(user.id);
