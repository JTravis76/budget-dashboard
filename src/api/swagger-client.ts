import HttpClient from "../lib/http-client";
import { sleep } from "../lib/utilities";
import svc from "./services/";
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
    getById: (id: number) => sleep(SLEEP_TIMER, svc.transaction.getBy(id)),
    post: (id: number, memo: string | null, tag: string | null) => sleep(SLEEP_TIMER, svc.transaction.updateMemoTag(id, memo, tag)),
    delete: (id: number) => sleep(SLEEP_TIMER, svc.transaction.deleteBy(id)),
  },
  transactions: {
    get: (filter?: ISearchFilter) => sleep(SLEEP_TIMER, svc.transaction.getFiltered(filter)),
    post: (transactions: ITransaction[]) => sleep(SLEEP_TIMER, svc.transaction.saveOrUpdate(transactions)),
    getAll: () => sleep(SLEEP_TIMER, svc.transaction.getAll()),
    deleteAll: () => sleep(SLEEP_TIMER, svc.transaction.deleteAll()),
    importTransactions: (transactions: ITransaction[]) => sleep(SLEEP_TIMER, svc.transaction.importTransactions(transactions)),
  },
  tags: {
    get: () => sleep(SLEEP_TIMER, svc.tag.getAll()),
    importTags: (tags: string[]) => sleep(SLEEP_TIMER, svc.tag.importTags(tags)),
    deleteAll: () => sleep(SLEEP_TIMER, svc.tag.deleteAll()),
  },
  rules: {
    get: () => sleep(SLEEP_TIMER, svc.rule.getAll()),
    post: (key: string, value: IRuleProperty) => sleep(SLEEP_TIMER, svc.rule.saveOrUpdate(key, value)),
    deleteBy: (key: string, value: IRuleProperty) => sleep(SLEEP_TIMER, svc.rule.deleteBy(key, value)),
    deleteAll: () => sleep(SLEEP_TIMER, svc.rule.deleteAll()),
    importRules: (rules: ITagProperty[]) => sleep(SLEEP_TIMER, svc.rule.importRules(rules))
  },
};
