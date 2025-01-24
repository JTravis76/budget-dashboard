/* A component to process CSV file and upload result to server. This component has
 * drag-n-drop support.
 * Credit for this component is inspired by this blog.
 * https://css-tricks.com/drag-and-drop-file-uploading/
 */
import van from "vanjs-core";
import { IconDownload } from "./icons";
import $store from "../stores";
import { Transaction } from "../api/schema";

const { div, input, label, span, strong } = van.tags

export const FileUploader = () => {
  //-------------------------------------------
  function onReset(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementsByClassName("dropzone")[0].classList.remove("is-dragover");
  }
  //-------------------------------------------
  function drop(e: DragEvent) {
    e.preventDefault();
    document.getElementsByClassName("dropzone")[0].classList.remove("is-dragover");
    document.getElementsByClassName("dropzone")[0].classList.add("is-uploading");

    if (e.dataTransfer && e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) processFile(file);
        }
      });
    } else if (e.dataTransfer && e.dataTransfer.files) {
      [...e.dataTransfer.files].forEach((file) => {
        processFile(file);
      });
    }
  }
  //-------------------------------------------
  function upload() {
    const input = document.getElementById("file") as HTMLInputElement;
    if (input && input.files) {
      [...input.files].forEach((file) => {
        if (file.type == "text/csv") {
          processFile(file);
        }
      });
    }
  }
  //-------------------------------------------
  function processFile(file: Blob) {
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
            const transaction = {} as Record<string, string | number>;
            for (const key of headers) {
              transaction[key] = data[i];
              i += 1;
            }

            transaction.amount = parseFloat(transaction.amount.toString());

            let t = new Transaction(transaction);
            // run the transaction through the Auto-Tag rules generator.
            t.tag = $store.tag.generateTag(t);
            if (t.dttm && t.name) transactions.push(t);
          }
          cnt += 1;
        });

        // Now we save the new transactions
        $store.transaction.saveTransactions(transactions)
          .then((res) => {
            if (res === 200) {
              document.getElementsByClassName("dropzone")[0].classList.remove("is-uploading");
              document.getElementsByClassName("dropzone")[0].classList.add("is-success");
              window.setTimeout(() => window.location.reload(), 1000);
            }
          });
      }
    });

    reader.readAsText(file);
  }
  //-------------------------------------------
  return div(
    {
      class: () => (window.FileReader)
        ? "dropzone has-advanced-upload"
        : "dropzone",
      style: "text-align: center;",
      ondragover: (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        document.getElementsByClassName("dropzone")[0].classList.add("is-dragover");
      },
      ondrop: (e: DragEvent) => drop(e),
      ondragend: (e: DragEvent) => onReset(e),
      ondragleave: (e: DragEvent) => onReset(e)
    },
    div({ class: "dropzone__input" },
      IconDownload({ class: "dropzone__icon" }),
      input({
        type: "file",
        name: "files[]",
        id: "file",
        class: "dropzone__file",
        multiple: "",
        onchange: () => upload(),
      }),
      label({ for: "file" },
        strong(
          "Choose a file",
        ),
        span({ class: "dropzone__dragndrop" },
          " or drag it here",
        ),
        ".",
      ),
      // br(),
      // button({ type: "button", class: "dropzone__button", onclick: () => upload() },
      //   "Upload",
      // ),
    ),
    div({ class: "dropzone__uploading" }, "Uploading..."),
    div({ class: "dropzone__success" }, "Done!"),
    div({ class: "dropzone__error" }, "Error"),
  );
}