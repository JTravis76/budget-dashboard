import { useSiteStore } from "./site-store";
import { useTransactionStore } from "./transaction-store";

export default {
  site: useSiteStore(),
  transaction: useTransactionStore()
}
