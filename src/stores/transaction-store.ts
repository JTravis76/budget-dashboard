import van from "vanjs-core";
import http from "../api/swagger-client";
import { Transaction } from "../api/schema";

export const useTransactionStore = () => {
  let transaction = van.state(new Transaction());
  //-------------------------------------------
  async function getTransactions(filter?: ISearchFilter) {
    return await http.transactions.get(filter);
  }
  //-------------------------------------------
  async function getTransactionById(id: number) {
    return new Promise(async (r) => {
      const data = await http.transaction.getById(id);
      transaction.val = new Transaction(data);
      r(true);
    });
  }
  //-------------------------------------------
  async function saveTransaction() {
    const { id, memo, tag } = transaction.val;
    return await http.transaction.post(id, memo, tag);
  }
  //-------------------------------------------
  async function saveTransactions(transactions: ITransaction[]) {
    return await http.transactions.post(transactions);
  }
  //-------------------------------------------
  async function removeTransaction(id: number) {
    return new Promise(async (r) => {
      await http.transaction.delete(id);
      transaction.val = new Transaction();
      r(true);
    });
  }
  //-------------------------------------------
  function assignTag(transaction: ITransaction) {

    return "";
  }
  //-------------------------------------------
  return {
    transaction,
    getTransactions,
    getTransactionById,
    saveTransaction,
    saveTransactions,
    removeTransaction,
    assignTag,
  };
}