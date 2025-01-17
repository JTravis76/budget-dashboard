import { useSiteStore } from "./site-store";
import { useTransactionStore } from "./transaction-store";
import { useUserStore } from "./user-store";
import { useDashboardStore } from "./dashboard-store";

export default {
  site: useSiteStore(),
  transaction: useTransactionStore(),
  user: useUserStore(),
  dashboard: useDashboardStore(),
}
