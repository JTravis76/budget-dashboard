/* This component displays the properties of the transaction within a modal window.
 * And is normally a child-component where the parent component would mark the selected
 * record and toggle the modal action to view its content.
 * 
 * It begins by reading the transaction object from the store and populates the form fields.
 * 
 * The "Tag" field is a selectable drop-down. The goal was to make it a dynamic list, which is
 * fed from an endpoint. While loading the data from a server, I had to build the <option> 
 * from a derive state that later append the element to the <select> tag. No reactive DOM state
 * that I could get to work :/
 *
 * UPDATED: I could reload the selectable data upon application loading, which seems to work in the
 * data-grid. I kept this code has it serves as a reference,
 * 
 * This component is also subscribed to the "Modal-Frame" component via emitter 'action' method. This
 * method is bind to the "Save" functionality of the "Modal-Frame"
 */
import van from "vanjs-core";
import { ModalFrame } from "./modal-frame";
import $modal from "../lib/modal";
import emitter from "../lib/event-emitter";
import $store from "../stores";
import { Transaction } from "../api/schema";

export const ModalTransaction = () => {
  const { div, label, input, select, option } = van.tags;
  //-------------------------------------------
  const { transaction } = $store.transaction;
  const { tags } = $store.tag;
  //-------------------------------------------
  emitter.subscribe("action", save);
  //-------------------------------------------
  function save() {
    $store.transaction.saveTransaction()
      .then(() => {
        $modal.close("TransactionModal");
        transaction.val = new Transaction();
      });
  };
  //-------------------------------------------
  let tagSelect = select(
    {
      class: "input",
      onchange: (e: Event) => transaction.val.tag = (e.target as HTMLSelectElement).value
    },
    option({ value: "" }, ""),
  );

  van.derive(() => {
    let optionList = new Array<HTMLOptionElement>();
    optionList = tags.val.map(
      (tag) => option(
        {
          value: tag,
          selected: () => transaction.val.tag === tag,
        },
        tag,
      ),
    );
    van.add(tagSelect, optionList);
  });
  //-------------------------------------------
  return ModalFrame(
    { id: "TransactionModal", title: "Transaction Properties", footer: true },
    div(
      div(
        label("Date"),
        input({
          type: "text",
          class: "input",
          disabled: true,
          value: () => transaction.val.dttm,
        }),
      ),
      div(
        label("Transaction"),
        input({
          type: "text",
          class: "input",
          disabled: true,
          value: () => transaction.val.transaction,
        }),
      ),
      div(
        label("Name"),
        input({
          type: "text",
          class: "input",
          disabled: true,
          value: () => transaction.val.name,
        }),
      ),
      div(
        label("Memo"),
        input({
          type: "text",
          class: "input",
          placeholder: "Enter memo.",
          value: () => transaction.val.memo,
          oninput: (e: Event) => transaction.val.memo = (e.target as HTMLInputElement).value
        }),
      ),
      div(
        label("Amount"),
        input({
          type: "text",
          class: "input",
          disabled: true,
          value: () => transaction.val.amount,
        }),
      ),
      div(
        label("Tag"),
        tagSelect,
      ),
    ),
  );
};
