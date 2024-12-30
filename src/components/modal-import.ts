import van from "vanjs-core";
import { ModalFrame } from "./modal-frame";
import { FileUploader } from "./file-uploader";

const { div, a } = van.tags;

export const ModalImport = () => {
  return ModalFrame(
    { id: "ImportModal", title: "Import Transactions" },
    div(
      a(
        {
          href: "./template.csv",
          traget: "_blank",
          class: "button is-small mb-4",
        }, "CSV template"),
      FileUploader(),
    ),
  );
}