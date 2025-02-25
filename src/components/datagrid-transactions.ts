/* This component builds a data-grid that contains a collection of transactions.
 * There is a few interesting things going on here:
 * - Data is passed-in via a prop, we process the result to build out the data-row.
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
import { ModalTransaction } from "./modal-transaction";
import { ModalImport } from "./modal-import";
import { ModalRuleBuilder } from "./modal-rule-builder";
import { MiniMenu } from "./mini-menu";
import $modal from "../lib/modal";
import $dialog from "../lib/dialog";
import $store from "../stores";
import { Transaction } from "../api/schema";
import emitter from "../lib/event-emitter";

export const DatagridTransactions = (props: { transactions: ITransaction[] }) => {
  const { div, table, thead, tbody, tfoot, tr, th, td, button, input, select, option, span } = van.tags;
  //-------------------------------------------
  const { tags } = $store.tag;
  const { transaction } = $store.transaction;
  //---------------------------------------------
  let memoId = van.state(0);
  let tagId = van.state(0);
  let total = van.state(0.0);
  //-------------------------------------------
  emitter.subscribe("edit", (id: number) => edit(id));
  emitter.subscribe("remove", (id: number) => remove(id));
  emitter.subscribe("tag", (id: number) => {
    // Open modal with Rule Builder form
    // and pre-fill the name & amount from transaction
    let t = props.transactions.find((x) => x.id == id) ?? new Transaction();
    $store.tag.setRule(t.name, { amount: Math.abs(t.amount), tag: "" });
    $modal.open("RuleBuilderModal");
  });
  //-------------------------------------------
  total.val = 0.0;
  //-------------------------------------------
  async function edit(id: number) {
    transaction.val = new Transaction();
    if (id > 0) {
      // Note: we could do the same as the edit Memo/Tag function.
      // But wanted to fetch from server versus copy data from data-row.
      await $store.transaction.getTransactionById(id);
    }
    $modal.open("TransactionModal");
  };
  //---------------------------------------------
  function remove(id: number) {
    if (id > 0) {
      $dialog({
        title: "Confirm",
        message: "Are you sure you want to remove this transaction?",
        type: "yesno",
      }).then((res) => {
        if (res) {
          $store.transaction.removeTransaction(id)
            .then(() => {
              window.location.reload();
            });
        }
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
  const rows = new Array<HTMLTableRowElement>();
  props.transactions.forEach((r) => {
    total.val = total.val + parseFloat(r.amount.toString());
    rows.push(
      tr(
        td(
          div({ class: "text-nowrap" }, r.dttm),
        ),
        td(r.transaction),
        td(
          div({ style: "max-width:350px", class: "text-ellipsis", title: r.name }, r.name),
        ),
        td(
          () => memoId.val != r.id
            ? button(
              {
                class: "button is-small text-ellipsis",
                style: "max-width:130px;display:block",
                title: r.memo,
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
          () => tagId.val != r.id
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
        td(
          MiniMenu({ id: r.id }),
          // div({ class: "buttons" },
          //   button({
          //     class: "button is-primary is-small is-outlined",
          //     onclick: () => edit(r.id),
          //   },
          //     IconEdit({ width: "16", height: "16" }),
          //   ),
          //   button({
          //     class: "button is-danger is-small is-outlined",
          //     onclick: () => remove(r.id),
          //   },
          //     IconRemove({ width: "16", height: "16" }),
          //   ),
          // ),
        ),
      ),
    );
  });
  //-------------------------------------------
  return div({},
    div(
      { class: "column" },
      div({ class: "table-container" },
        table(
          { class: "table is-striped is-narrow is-fullwidth is-hoverable" },
          thead(
            tr(
              th("Date"),
              th("Transaction"),
              th("Name"),
              th("Memo"),
              th("Amount"),
              th("Tag"),
              th(
                // button({
                //   class: "button is-secondary is-small",
                //   onclick: () => edit(0),
                // }, "add"),
                button({
                  class: "button is-secondary is-small",
                  onclick: () => $modal.open("ImportModal"),
                }, "Import"),
              ),
            ),
          ),
          () => {
            if (props.transactions.length === 0) {
              return tbody(tr(td({ colSpan: 8 }, "No records found.")));
            }
            return tbody(rows);
          },
          tfoot(
            tr(
              td({ colSpan: 4 }, ""),
              td({ colSpan: 3 },
                span(
                  { class: "has-text-weight-bold" },
                  "$", Math.abs(total.val).toFixed(2)
                ),
              ),
            ),
          )
        ),
      ),
    ),
    ModalTransaction(),
    ModalImport(),
    ModalRuleBuilder(),
  );
}