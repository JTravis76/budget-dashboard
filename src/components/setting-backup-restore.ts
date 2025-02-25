import van from "vanjs-core";
import $dialog from "../lib/dialog";
import $store from "../stores";
import $toast from "../lib/toast";
import { Transaction } from "../api/schema";
import { IconThreeDotsLoading } from "./icons";

export const SettingBackupRestore = () => {
  const { div, h4, p, button, input } = van.tags;
  //---------------------------------------------
  let loadingBackup = van.state(false);
  let loadingRestore = van.state(false);
  //---------------------------------------------
  let style = "border-left: 2px solid; padding-left: 10px;";
  //---------------------------------------------
  function backup() {
    loadingBackup.val = true;
    // Read all data from DB and convert to text file for download.
    $store.dashboard.getAllTransactions().then((res) => {
      if (res === 200) {
        let bkp = {
          transaction: $store.dashboard.transactions.val,
          rules: $store.tag.rules.val,
          tags: $store.tag.tags.val,
        };

        let content = JSON.stringify(bkp);
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `budget-backup_${new Date().toISOString()}.json`;
        link.click();
        loadingBackup.val = false;
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
        loadingRestore.val = true;

        let restore = JSON.parse(result) as {
          transaction: ITransaction[],
          rules: ITagProperty[],
          tags: string[],
        };

        // assuming the parsing is successful
        let transactions = new Array<ITransaction>();
        restore.transaction.forEach((t) => {
          let transaction = new Transaction(t);
          transaction.id = 0;
          transactions.push(transaction);
        });

        if (transactions.length > 0)
          $store.transaction.importTransactions(transactions);

        if (restore.rules.length > 0)
          $store.tag.importRules(restore.rules);

        if (restore.tags.length > 0)
          $store.tag.importTags(restore.tags);

        loadingRestore.val = false;
        $toast({ message: "Database restored successful", type: "success" });
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
        button(
          {
            class: "button is-default",
            disabled: () => loadingBackup.val,
            onclick: () => backup(),
          },
          () => loadingBackup.val ? IconThreeDotsLoading() : "Backup"
        ),
        p("Restore database from a backup."),
        button(
          {
            class: "button is-default",
            disabled: () => loadingRestore.val,
            onclick: () => restore(),
          },
          () => loadingRestore.val ? IconThreeDotsLoading() : "Restore"
        ),
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