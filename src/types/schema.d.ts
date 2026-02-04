interface ITransaction {
  id: number;
  dttm: string | null; // nullable due to HTML date element
  transaction: string;
  name: string;
  memo: string | null;
  amount: number;
  tag: string | null;
}

interface IBaseResponse {
  message: string | null;
}

interface ILoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  darkTheme: boolean;
  token: string | null;
}

interface ILoginRequest {
  credential?: string | null;
}
