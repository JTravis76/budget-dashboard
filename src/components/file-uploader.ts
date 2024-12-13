import van from "vanjs-core";
import { IconDownload } from "./icon-download";
//import emitter from "../lib/event-emitter";
import $store from "../stores";
import { Transaction } from "../api/schema";

const { button, div, input, label, span, strong } = van.tags
//-------------------------------------------
//emitter.subscribe("action", save);
//-------------------------------------------

function drop(e: DragEvent) {
  e.preventDefault();

  // if (e.dataTransfer && e.dataTransfer.items) {
  //   [...e.dataTransfer.items].forEach((item, i) => {
  //     if (item.kind === "file") {
  //       const file = item.getAsFile();
  //       console.log(`file[${i}].name = ${file?.name}`)
  //     }
  //   });
  // }

  if (e.dataTransfer && e.dataTransfer.files) {
    [...e.dataTransfer.files].forEach((file) => {

      const reader = new FileReader();
      reader.addEventListener("load", (ev: ProgressEvent) => {

        const result = (ev.target as FileReader).result;
        if (result && typeof result === "string") {
          let cnt = 0;
          let headers = new Array<string>();
          const transactions = new Array<ITransaction>();
          result.split("\r\n").forEach((x) => {
            if (cnt === 0) {
              headers = x.split(",");
            } else {
              const data = x.replaceAll('"', "").split(",");

              let i = 0;
              const transaction = {} as Record<string, string>;
              for (const key of headers) {
                transaction[key] = data[i];
                i += 1;
              }

              transactions.push(new Transaction(transaction));
            }
            cnt += 1;
          });

          // Now we save the new transactions
          $store.transaction.saveTransactions(transactions)
            .then((res) => {
              if (res === 0) {
                window.location.reload();
                // nice-to-have:
                // display toast msg & refresh data-grid
              }
            });
        }
      });

      reader.readAsText(file);
    });
  }
}

// https://css-tricks.com/drag-and-drop-file-uploading/
export const FileUploader = () => {
  return div(
    {
      class: "box has-advanced-upload",
      style: "text-align: center;",
      ondragover: (e: Event) => e.preventDefault(),
      ondrop: (e: DragEvent) => drop(e),
    },
    div({ class: "box__input" },
      IconDownload(),
      input({ type: "file", name: "files[]", id: "file", class: "box__file", "data-multiple-caption": "{count} files selected", multiple: "" }),
      label({ for: "file" },
        strong(
          "Choose a file",
        ),
        span({ class: "box__dragndrop" },
          " or drag it here",
        ),
        ".",
      ),
      button({ type: "submit", class: "box__button" },
        "Upload",
      ),
    ),
  );
}