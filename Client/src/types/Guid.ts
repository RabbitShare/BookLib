export default class Guid {
	public static newGuid(): Guid {
		return new Guid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			const r = Math.random() * 16 | 0;
			const v = (c === 'x') ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		}));
	}
	public static get empty(): Guid {
		return new Guid('00000000-0000-0000-0000-000000000000');
	}
	public get empty(): Guid {
		return Guid.empty;
	}
	public static isValid(str: string): boolean {
		const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return validRegex.test(str);
	}
	private value: string = '00000000-0000-0000-0000-000000000000';
	constructor(value?: string) {
		if (value) {
			if (Guid.isValid(value)) {
				this.value = value;
			}
		}
	}
	public toString() {
		return this.value;
	}

	public toJSON(): string {
		return this.value;
	}
}