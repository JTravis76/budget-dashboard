//import { transactions } from "../api/data";
import { Transaction } from "../api/schema";

async function initDB() {
  return new Promise((r) => {
    //if (getAll().length === 0) saveChanges(transactions);
    r(200);
  });
}

/** save the schema to localstorage */
function saveChanges(schema = new Array<ITransaction>()) {
  window.localStorage.setItem("db", JSON.stringify(schema));
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
  return JSON.parse(window.localStorage.getItem("db") ?? "[]");
}

/** Read the transaction by ID
 * @param id ID of transaction to read. If 0, a new transaction is returned
 */
function getBy(id: number): ITransaction {
  return getAll().find((x) => x.id === id) ?? new Transaction();
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

export default {
  initDB,
  getAll,
  getBy,
  create,
  update,
  deleteBy,
};