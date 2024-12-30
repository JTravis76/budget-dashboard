interface ITransaction {
  id: number;
  dttm: string | null; // nullable due to HTML date element
  transaction: string;
  name: string;
  memo: string | null;
  amount: number;
  tag: string | null;
}
