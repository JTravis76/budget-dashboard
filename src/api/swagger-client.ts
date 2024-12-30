import HttpClient from "../lib/http-client";
import { sleep } from "../lib/utilities";
import { tags } from "./data";
import localDb from "../lib/local-db";
import { Transaction } from "./schema";
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
    post: (id: number, memo: string | null, tag: string | null) => {
      // simulate some API middleware
      // by taking the pass argurments and building a new object to send to DB
      let transaction = new Transaction({ id, memo, tag });
      if (id > 0) {
        localDb.getAll().forEach((t) => {
          if (t.id === id) {
            t.memo = memo;
            t.tag = tag;
            localDb.update(t);
            transaction = t;
          }
        });
      }

      return transaction;
    },
    delete: (id: number) => sleep(SLEEP_TIMER, localDb.deleteBy(id)),
  },
  transactions: {
    get: (filter?: ISearchFilter) => sleep(SLEEP_TIMER, localDb.getFiltered(filter)),
    post: (transactions: ITransaction[]) => {
      // we could check for ID and perform an Update too ?
      transactions.forEach((t) => localDb.create(t));
      return 200;
    },
  },
  tags: {
    get: () => sleep(SLEEP_TIMER, tags),
  },
};
