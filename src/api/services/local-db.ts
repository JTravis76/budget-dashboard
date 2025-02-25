/* A simple library for managing localstorage databases. */
class LocalDb {
  private _dbname = "";
  constructor(name: string) {
    this._dbname = name;
  }

  get<T>() {
    return JSON.parse(window.localStorage.getItem(this._dbname) ?? "[]") as T
  }

  set<T>(data: T) {
    window.localStorage.setItem(this._dbname, JSON.stringify(data))
  }

  exist(): boolean {
    return !!window.localStorage.getItem(this._dbname);
  }
}


export default {
  transactions: new LocalDb("db"),
  tags: new LocalDb("tag"),
  rules: new LocalDb("rule"),
  user: new LocalDb("user"),
}