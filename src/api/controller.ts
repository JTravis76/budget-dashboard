import HttpClient from "../lib/http-client";
import $toast from "../lib/toast";
import { useUserStore } from "../stores/user-store";
//const user = useUserStore();
//-------------------------------------------
const httpClient = HttpClient;
httpClient.defaults.baseUrl = `${import.meta.env.VITE_API_URL}`;
httpClient.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json, */*",
    "Content-Type": "application/json",
    //Authorization: user.authenticated ? `Basic ${user.profile.val.token}` : null,
  };
  config.mode = "cors";
  //config.credentials = "include";
  return config;
});
//-------------------------------------------
const success = () => { }
const failure = (response: Response, data: IBaseResponse) => {
  switch (response.status) {
    case 400:
      $toast({ message: data.message!, type: "error" });
      break;
    default:
      console.error(response.text);
      break;
  }
}
httpClient.interceptors.response.use(success, failure);
//-------------------------------------------
export default {
  aboutserver: {
    get: () => httpClient.get<void>("/aboutserver"),
  },
  login: {
    post: (payload: ILoginRequest) => httpClient.post<ILoginResponse>("/login", payload),
  },
  user: {
    get: (email: string) => httpClient.get<IUser | null>(`/user?email=${email}`),
  },
  transactions: {
    get: (page?: number, pagesize?: number) => httpClient.get<ITransaction[]>(`/transactions?page=${page}&pagesize=${pagesize}`),
    post: () => httpClient.post<any>("/transactions"),
  },
  transaction: {
    put: () => httpClient.put<any>("/transaction"),
  },
  tags: {
    get: () => httpClient.get<any>("/tags"),
  },
  autotags: {
    get: () => httpClient.get<any>("/autotags"),
  }
}