interface ITransaction {
  id: number;
  dttm: string | null;
  transaction: string;
  name: string;
  memo: string | null;
  amount: number;
  tag: string | null;
}
