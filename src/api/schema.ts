export class Transaction implements ITransaction {
  constructor(init?: Partial<ITransaction>) {
    this.id = 0;
    this.dttm = null;
    this.transaction = "CREDIT";
    this.name = "";
    this.memo = null;
    this.amount = 0;
    this.tag = null;

    if (init) Object.assign(this, init);
  }
  id: number;
  dttm: string | null;
  transaction: string;
  name: string;
  memo: string | null;
  amount: number;
  tag: string | null;
}