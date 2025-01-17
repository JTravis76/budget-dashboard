//https://css-tricks.com/understanding-event-emitters/

interface Events {
  [key: string]: Function[];
}

class EventEmitter {
  private _events: Events;

  constructor(events?: Events) {
    this._events = events || {};
  }

  public subscribe(name: string, cb: Function) {
    (this._events[name] || (this._events[name] = [])).push(cb);

    return {
      unsubscribe: () =>
        this._events[name] &&
        this._events[name].splice(this._events[name].indexOf(cb) >>> 0, 1),
    };
  }

  public emit(name: string, ...args: any[]): void {
    (this._events[name] || []).forEach((fn) => fn(...args));
  }
}

export default new EventEmitter();
