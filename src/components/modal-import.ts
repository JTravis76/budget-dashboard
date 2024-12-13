import van from "vanjs-core";
import { ModalFrame } from "./modal-frame";
import { FileUploader } from "./file-uploader";

const { } = van.tags;

export const ModalImport = () => {
  return ModalFrame(
    { id: "ImportModal", title: "Import Transactions" },
    FileUploader(),
  );
}