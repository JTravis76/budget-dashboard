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
import { Pagination } from "../components/pagination";
import $store from "../stores";
import emitter from "../lib/event-emitter";
import { SearchFilter } from "../models";

const { div } = van.tags;
//---------------------------------------------
let loading = van.state(false);
let pageData = van.state({ filter: new SearchFilter(), data: new Array<ITransaction>() });
//---------------------------------------------
emitter.subscribe("search", (filter: ISearchFilter) => reload(filter));
//---------------------------------------------
emitter.subscribe("page", (filter: ISearchFilter) => reload(filter, 1));
//---------------------------------------------
function reload(filter: ISearchFilter, type: number = 0) {
  switch (type) {
    case 0:
      //search type
      pageData.val.filter = filter;
      break;
    case 1:
      // pagination type
      pageData.val.filter.page = filter.page;
      pageData.val.filter.pagesize = filter.pagesize;
      break;
  }

  loading.val = true
  $store.transaction.getTransactions(pageData.val.filter)
    .then((res) => {
      pageData.val = res;
      loading.val = false
    });
}
//---------------------------------------------
export const Transactions = async () => {
  pageData.val = await $store.transaction.getTransactions();

  return div(
    TransactionFilter(),
    () => loading.val
      ? div({ class: "skeleton-block" })
      : div(
        Pagination({
          page: pageData.val.filter.page,
          pagesize: pageData.val.filter.pagesize,
          total: pageData.val.filter.pagecount
        }),
        DatagridTransactions({ transactions: pageData.val.data }),
        Pagination({
          page: pageData.val.filter.page,
          pagesize: pageData.val.filter.pagesize,
          total: pageData.val.filter.pagecount
        }),
      ),
  );
};
