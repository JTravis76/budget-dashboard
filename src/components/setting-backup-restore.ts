import van from "vanjs-core";
import $dialog from "../lib/dialog";
import $store from "../stores";
import { Transaction } from "../api/schema";

const { div, h4, p, button, input } = van.tags;

export const SettingBackupRestore = () => {
  let style = "border-left: 2px solid; padding-left: 10px;";
  //---------------------------------------------
  function backup() {
    // Read all data from DB and convert to text file for download.
    $store.dashboard.getAllTransactions().then((res) => {
      if (res === 200) {
        let content = JSON.stringify($store.dashboard.transactions.val);
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        let d = new Date();
        link.download = `budget-backup_${d.getFullYear()}-${d.getMonth() + 1}.json`;
        link.click();
      }
    });
  }
  //---------------------------------------------
  function restore() {
    $dialog({
      title: "Overwrite confirmation?",
      message: "Are you sure you want to restore from this backup? This cannot be undone.",
      type: "yesno",
    }).then((res) => {
      if (res) {
        const input = document.getElementById("file") as HTMLInputElement;
        input.onchange = () => {
          if (input && input.files) {
            [...input.files].forEach((file) => {
              if (file.type == "application/json") {
                readFile(file);
              }
            });
          }
        }
        input.click();
      }
    });
  }
  //---------------------------------------------
  function readFile(file: Blob) {
    const reader = new FileReader();
    reader.addEventListener("load", (ev: ProgressEvent) => {
      const result = (ev.target as FileReader).result;
      if (result && typeof result === "string") {
        let transactions = new Array<ITransaction>();
        (JSON.parse(result) as ITransaction[]).forEach((t) => {
          let transaction = new Transaction(t);
          transaction.id = 0;
          transactions.push(transaction);
        });
        // assuming the parsing is successful
        // clear DB 1st to have a clean slate.
        if (transactions.length > 0) {
          $store.transaction.resetTansactions().then((res) => {
            if (res === 200) {
              $store.transaction.saveTransactions(transactions).then((res) => {
                if (res === 200) {
                  // TODO: toast msg
                  alert("database restored successful.");
                }
              });
            }
          });
        }
      }
    });
    reader.readAsText(file);
  }
  //---------------------------------------------
  return div({ class: "columns" },
    div({ class: "column is-one-fifth" },
      h4({ class: "title is-4" }, "Backup / Restore")
    ),
    div({ class: "column" },
      div({ style },
        p("Export the entire database to create a backup."),
        button({ class: "button is-default", onclick: () => backup() }, "Backup"),
        p("Restore database from a backup."),
        button({ class: "button is-default", onclick: () => restore() }, "Restore"),
        input({
          type: "file",
          name: "files[]",
          id: "file",
          style: "opacity: 0",
          multiple: "",
        }),
      ),
    ),

  );
}