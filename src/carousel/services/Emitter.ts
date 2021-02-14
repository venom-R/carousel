type ListenerType = (...args: any[]) => any;

type EventsType = {
	[key: string]: ListenerType[];
};

export class Emitter {
	private _events: EventsType = {};

	public on(type: string, listener: ListenerType): void {
		this._events[type] = this._events[type] || [];
		this._events[type].push(listener);
	}

	public off(type: string, listener: ListenerType): void {
		if (this._events[type]) {
			this._events[type].filter((fn: ListenerType) => fn !== listener);
		}
	}

	public emit(type: string, ...args: any[]): void {
		if (this._events[type]) {
			this._events[type].forEach((listener: ListenerType) => {
				listener(...args);
			});
		}
	}
}
