import van from "vanjs-core";
import { ModalFrame } from "./modal-frame";
import { FileUploader } from "./file-uploader";

export const ModalImport = () => {
  const { div, button } = van.tags;
  //-------------------------------------------
  function download() {
    let content = '"Date","Transaction","Name","Memo","Amount"\n"2025-01-01","DEBIT","DEBIT PURCHASE -VISA KROGER #0001 ANYTOWN USA","Download from bank","-99.91"\n"2025-01-02","DEBIT","DEBIT PURCHASE -VISA WENDY #0001 ANYTOWN USA","Download from bank","-29.32"';
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = "template.csv";
    link.click();
  }
  //-------------------------------------------
  return ModalFrame(
    { id: "ImportModal", title: "Import Transactions" },
    div(
      button({ class: "button is-small mb-4", onclick: () => download() }, "CSV template"),
      FileUploader(),
    ),
  );
}