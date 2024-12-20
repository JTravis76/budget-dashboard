/* This component serves as the entry point to the Transaction route. When the initial component loads,
 * we fetch data from the API and wait for the request to return.
 * - This prevent a race condition where the component is rendered BEFORE the data is returned from the server,
 * - We set the component itself as "asynchronous". This is later handled by the router.
 * - Once data is returned from the server, we pass the data to the child component via a prop.
 * 
 * We subscribe to the "search" emitter provided from the "TransactionFilter". This allows us to listen
 * and know when the event has been triggered. Once triggered, the search filter object is returned and 
 * sent to the API for new data based on the given search criteria. During the request, we changed the state of the
 * "loading" variable to temporary toggle the data grid with a skeleton loading block until the request is full-filled.
 */
import van from "vanjs-core";
import { TransactionFilter } from "../components/transaction-filter";
import { DatagridTransactions } from "../components/datagrid-transactions";
import $store from "../stores";
import emitter from "../lib/event-emitter";

const { div } = van.tags;
//---------------------------------------------
let loading = van.state(false);
let data = van.state(new Array<ITransaction>());
//---------------------------------------------
emitter.subscribe("search", (filter: ISearchFilter) => {
  loading.val = true
  $store.transaction.getTransactions(filter)
    .then((res) => {
      data.val = res;
      loading.val = false
    });
});
//---------------------------------------------
export const Transactions = async () => {
  data.val = await $store.transaction.getTransactions();

  return div(
    TransactionFilter(),
    () => loading.val
      ? div({ class: "skeleton-block" })
      : DatagridTransactions({ transactions: data.val })
  );
};
