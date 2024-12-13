/* This component builds a data-grid that contains a collection of transactions.
 * There is a few interesting things going on here:
 * - To prevent a race condition where the component is rendered BEFORE the data is returned from the server,
 *   We set the component itself as "asynchronous". This is later handled by the router.
 * - Once data is returned from the server, we process the result to build out the data-row.
 *   -- Including an edit button to trigger a modal window.
 *   -- A delete button to remove the selected transaction.
 *   -- Inline text field to edit the "memo". (Upon clicking the text button within the record)
 *   -- Inline select drop-down to update the tag. (Upon clicking the text button within the record)
 *   -- Both inline field are sent to server either pressing the Enter key/lost focus (memo field) or making a selection (tag field).
 * - Transactions data is NOT read/sent from/to the central-store. Only to the data-grid. However, the
 *   [selected] transaction is sent to the central-store for modal window or the inline edits. This allows the
 *   saving process from a single-source-of-truth.
 * - Modal component is triggered via a plug-in, passing in the element ID.
 */
import van from "vanjs-core";
import { ModalTransaction } from "../components/modal-transaction";
import { ModalImport } from "../components/modal-import";
import { modal } from "../lib/modal";
import $store from "../stores";
import { Transaction } from "../api/schema";

const { div, table, thead, tbody, tr, th, td, button, input, select, option } = van.tags;
//---------------------------------------------
const { tags } = $store.site;
const { transaction } = $store.transaction;
//---------------------------------------------
let memoId = van.state(0);
let tagId = van.state(0);
//---------------------------------------------
async function edit(id: number) {
  transaction.val = new Transaction();
  if (id > 0) {
    // Note: we could do the same as the edit Memo/Tag function.
    // But wanted to fetch from server versus copy data from data-row.
    await $store.transaction.getTransactionById(id);
  }
  modal.open("TransactionModal");
};
//---------------------------------------------
function remove(id: number) {
  if (id > 0) {
    $store.transaction.removeTransaction(id)
      .then(() => {
        window.location.reload();
      });
  }
};
//-------------------------------------------
function save() {
  $store.transaction.saveTransaction()
    .then(() => {
      memoId.val = 0;
    });
}
//-------------------------------------------
export const Transactions = async () => {
  const data = await $store.transaction.getTransactions();

  const rows = new Array<HTMLTableRowElement>();
  data.forEach((r) => {
    rows.push(
      tr(
        td(
          button({
            class: "button is-primary is-small is-outlined",
            onclick: () => edit(r.id),
          }, "edit"),
          button({
            class: "button is-danger is-small is-outlined",
            onclick: () => remove(r.id),
          }, "del"),
        ),
        td(r.dttm),
        td(r.transaction),
        td(r.name),
        td(
          () => memoId.val == 0
            ? button(
              {
                class: "button is-small",
                onclick: () => {
                  transaction.val = r;
                  memoId.val = r.id;
                }
              },
              r.memo,
            )
            : input({
              type: "text",
              class: "input",
              value: () => r.memo,
              oninput: (e: Event) => {
                r.memo = (e.target as HTMLInputElement).value;
                transaction.val.memo = r.memo;
              },
              onblur: () => save(),
              onkeyup: (e: KeyboardEvent) => {
                if (e.key.includes("Enter")) {
                  save();
                }
              },
            }),
        ),
        td(r.amount),
        td(
          () => tagId.val == 0
            ? button(
              {
                class: "button is-small",
                onclick: () => {
                  transaction.val = r;
                  tagId.val = r.id;
                }
              },
              r.tag,
            )
            : select(
              {
                class: "input",
                onblur: () => tagId.val = 0,
                onchange: (e: Event) => {
                  r.tag = (e.target as HTMLSelectElement).value;
                  transaction.val.tag = r.tag;
                  $store.transaction.saveTransaction()
                    .then(() => {
                      tagId.val = 0;
                    });
                },
              },
              option({ value: "" }, ""),
              tags.val.map((tag) => option({ value: tag, selected: r.tag === tag }, tag))
            )
        ),
      ),
    );
  });
  //-------------------------------------------
  return div(
    { class: "columns" },
    div(
      { class: "column" },
      table(
        { class: "table" },
        thead(
          tr(
            th(
              // button({
              //   class: "button is-secondary is-small",
              //   onclick: () => edit(0),
              // }, "add"),
              button({
                class: "button is-secondary is-small",
                onclick: () => modal.open("ImportModal"),
              }, "Import"),
            ),
            th("Date"),
            th("Transaction"),
            th("Name"),
            th("Memo"),
            th("Amount"),
            th("Tag"),
          ),
        ),
        () => {
          if (data.length === 0) {
            return tbody(tr(td({ colSpan: 7 }, "No records found.")));
          }
          return tbody(rows);
        },
      ),
    ),
    ModalTransaction(),
    ModalImport(),
  );
};
