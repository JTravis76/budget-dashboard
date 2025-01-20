import HttpClient from "../lib/http-client";
import { sleep } from "../lib/utilities";
import { tags } from "./data";
import localDb from "../lib/local-db";
//-------------------------------------------
const SLEEP_TIMER = 800;
//-------------------------------------------
const httpClient = HttpClient;
httpClient.defaults.baseUrl = `${import.meta.env.VITE_API_URL}`;
httpClient.interceptors.request.use((config) => {
  config.headers = {
    Accept: "application/json, */*",
    "Content-Type": "application/json",
  };
  config.mode = "cors";
  config.credentials = "include";
  return config;
});
//-------------------------------------------
export default {
  healthcheck: {
    get: () => httpClient.get<void>("/healthcheck"),
  },
  aboutserver: {
    get: () => httpClient.get<void>("/aboutserver"),
  },
  transaction: {
    getById: (id: number) => sleep(SLEEP_TIMER, localDb.getBy(id)),
    post: (id: number, memo: string | null, tag: string | null) => sleep(SLEEP_TIMER, localDb.updateMemoTag(id, memo, tag)),
    delete: (id: number) => sleep(SLEEP_TIMER, localDb.deleteBy(id)),
  },
  transactions: {
    get: (filter?: ISearchFilter) => sleep(SLEEP_TIMER, localDb.getFiltered(filter)),
    post: (transactions: ITransaction[]) => sleep(SLEEP_TIMER, localDb.saveOrUpdate(transactions)),
    getAll: () => sleep(SLEEP_TIMER, localDb.getAll()),
  },
  tags: {
    get: () => sleep(SLEEP_TIMER, tags),
  },
};
