import dbcontext from "./local-db";
import { SearchFilter } from "../../models";
import { Transaction } from "../schema";


function initDB() {
  if (!dbcontext.transactions.exist())
    saveChanges([]);
}


/** save the schema to localstorage */
function saveChanges(schema = new Array<ITransaction>()) {
  dbcontext.transactions.set(schema);
}

/** Process a collection of transactions */
function saveOrUpdate(transactions: ITransaction[]) {
  transactions.forEach((t) => {
    if (t.id === 0) create(t);
    else if (t.id > 0) update(t)
  });
  return 200;
}

/** Update the transaction with either memo or tag */
function updateMemoTag(id: number, memo: string | null, tag: string | null) {
  let transaction = new Transaction({ id, memo, tag });
  if (id > 0) {
    getAll().forEach((t) => {
      if (t.id === id) {
        t.memo = memo;
        t.tag = tag;
        update(t);
        transaction = t;
      }
    });
  }
  return transaction;
}

function importTransactions(transactions: ITransaction[]) {
  deleteAll();
  saveChanges(transactions);
  return 200;
}

//-------------------------------------------
// == (C)reate, (U)pdate, (R)ead, (D)elete == //
//-------------------------------------------

/** Insert a new transaction */
function create(transaction: ITransaction) {
  // TIP: pop() modifies the collection
  const id = getAll()
    .sort((a, b) => a.id > b.id ? 1 : -1)
    .pop()?.id ?? 0;
  transaction.id = id + 1;

  const transactions = getAll();
  transactions.push(transaction);
  saveChanges(transactions);
}

/** Update a transaction */
function update(transaction: ITransaction) {
  let transactions = getAll();
  transactions.forEach((t) => {
    if (t.id === transaction.id) Object.assign(t, transaction);
  });
  saveChanges(transactions);
}

/** Read all the transactions */
function getAll(): ITransaction[] {
  initDB();
  let all = dbcontext.transactions.get<ITransaction[]>();
  if (all.length > 0) {
    all = all.sort((a, b) => {
      let d1 = new Date(a.dttm ?? "");
      let d2 = new Date(b.dttm ?? "");
      return d1 < d2 ? 1 : -1;
    });
  }
  return all;
}

/** Read the transaction by ID
 * @param id ID of transaction to read. If 0, a new transaction is returned
 */
function getBy(id: number): ITransaction {
  return getAll().find((x) => x.id === id) ?? new Transaction();
}

/** Read all the transaction based on filtered */
function getFiltered(filtered = new SearchFilter()) {
  const all = getAll();
  let result = all;

  // == Search filter ==
  if (filtered.search) {
    let search = filtered.search.toUpperCase();
    result = all.filter((x) => x.name?.toUpperCase().includes(search));
  }

  // == Tag filter ==
  if (filtered.tag) {
    let tag = filtered.tag;
    if (tag === "BLANK") result = result.filter((x) => x.tag == null || x.tag == undefined || x.tag == "")
    else result = result.filter((x) => x.tag == tag);
  }

  // == Date filter ==
  let start = new Date(filtered.date.start ?? "");
  let end = new Date(filtered.date.end ?? "");

  if (filtered.date.start && filtered.date.end)
    result = result.filter((x) => new Date(x.dttm!) >= start && new Date(x.dttm!) <= end);

  if (!filtered.date.start && filtered.date.end)
    result = result.filter((x) => new Date(x.dttm!) <= end);

  if (filtered.date.start && !filtered.date.end)
    result = result.filter((x) => new Date(x.dttm!) >= start);

  // == Amount filter ==
  // TODO: only returning negative (DEBIT) values, need to include CREDIT
  if (filtered.amount.start && filtered.amount.end) {
    let from = parseFloat(filtered.amount.start) * -1;
    let to = parseFloat(filtered.amount.end) * -1;
    result = result.filter((x) => x.amount! <= from && x.amount! >= to);
  }
  if (!filtered.amount.start && filtered.amount.end) {
    let to = parseFloat(filtered.amount.end) * -1;
    result = result.filter((x) => x.amount! >= to);
  }
  if (filtered.amount.start && !filtered.amount.end) {
    let from = parseFloat(filtered.amount.start) * -1;
    result = result.filter((x) => x.amount! <= from);
  }

  // == Pagination ==
  filtered.pagecount = Math.ceil(result.length / filtered.pagesize);
  let paginatedData = new Array<ITransaction>();
  let skipTo = (filtered.page - 1) * filtered.pagesize;
  let take = result.length > filtered.pagesize
    ? skipTo + filtered.pagesize
    : result.length;

  for (let i = skipTo; i < take; i++) {
    // !! last page might be less than "take" value !!
    if (result[i]) paginatedData.push(result[i]);
  }
  result = paginatedData;

  return {
    filter: filtered,
    data: result
  }
}

/** Delete a transaction */
function deleteBy(id: number) {
  const transactions = getAll();
  for (let i = 0; i < transactions.length; i += 1) {
    if (transactions[i].id === id) {
      transactions.splice(i, 1);
      break;
    }
  }
  saveChanges(transactions);
}

/** Removes all the records. */
function deleteAll() {
  saveChanges([]);
  return 200;
}

export default {
  create,
  update,
  saveOrUpdate,
  updateMemoTag,
  getAll,
  getBy,
  getFiltered,
  deleteBy,
  deleteAll,
  importTransactions,
}