export class Transaction implements ITransaction {
  constructor(init?: Partial<ITransaction>) {
    this.id = 0;
    this.dttm = null;
    this.date = null;
    this.transaction = "CREDIT";
    this.name = "";
    this.memo = null;
    this.amount = 0;
    this.tag = null;

    if (init) Object.assign(this, init);
  }
  id: number;
  dttm: string | null;
  date: string | null;
  transaction: string;
  name: string;
  memo: string | null;
  amount: number;
  tag: string | null;
}

export class User implements ILoginResponse {
  constructor(init?: Partial<ILoginResponse>) {
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.darkTheme = false;
    this.token = null;

    if (init) Object.assign(this, init);
  }
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  darkTheme: boolean;
  token: string | null;
}