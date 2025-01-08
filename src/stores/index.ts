import { useSiteStore } from "./site-store";
import { useTransactionStore } from "./transaction-store";
import { useUserStore } from "./user-store";

export default {
  site: useSiteStore(),
  transaction: useTransactionStore(),
  user: useUserStore(),
}
