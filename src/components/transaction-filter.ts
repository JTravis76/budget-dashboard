import van from "vanjs-core";
import emitter from "../lib/event-emitter";
import { SearchFilter } from "../models";
import $store from "../stores";

const { div, label, input, button, small, form, select, option } = van.tags;
//---------------------------------------------
const { tags } = $store.site;
//---------------------------------------------
const advSearch = van.state(false);
let filters = new SearchFilter();
//---------------------------------------------
function reset() {
  filters = new SearchFilter();
}
//---------------------------------------------
let tagSelect = select(
  {
    class: "input",
    onchange: (e: Event) => filters.tag = (e.target as HTMLSelectElement).value
  },
  option({ value: "" }, ""),
);

van.derive(() => {
  let optionList = new Array<HTMLOptionElement>();
  optionList = tags.val.map((tag) => option({ value: tag }, tag),
  );
  van.add(tagSelect, optionList);
});
//-------------------------------------------
export const TransactionFilter = () => {
  return div({ class: "box" },
    form(
      div({ class: "is-pulled-right" },
        button(
          {
            type: "button",
            onclick: () => advSearch.val = !advSearch.val
          },
          small("Advance search")
        ),
      ),
      div({ class: "is-clearfix" }),
      div({ class: "columns" },
        div({ class: "column" },
          div({ class: "field" },
            label({ class: "field" }, "Search"),
            div(
              { class: "control" },
              input({
                class: "input",
                type: "text",
                placeholder: "Search..",
                oninput: (e: Event) => filters.search = (e.target as HTMLInputElement).value
              }),
            ),
          ),
        ),
        div({ class: "column" },
          div({ class: "field" },
            label({ class: "field" }, "Tags"),
            div(
              { class: "control" },
              tagSelect,
            ),
          ),
        ),
      ),
      div({ class: () => advSearch.val ? "columns" : "is-hidden" },
        div({ class: "column" },
          label({ class: "field" }, "Date From"),
          input({
            class: "input",
            type: "date",
            onblur: (e: Event) => filters.date.start = (e.target as HTMLInputElement).value
          }),
        ),
        div({ class: "column" },
          label({ class: "field" }, "Date To"),
          input({
            class: "input",
            type: "date",
            onblur: (e: Event) => filters.date.end = (e.target as HTMLInputElement).value,
          }),
        ),
        div({ class: "column" },
          label({ class: "field" }, "Amount"),
          input({
            class: "input",
            type: "number",
            placeholder: "start",
            oninput: (e: Event) => filters.amount.start = (e.target as HTMLInputElement).value
          }),
        ),
        div({ class: "column" },
          label({ class: "field" }, "Amount"),
          input({
            class: "input",
            type: "number",
            placeholder: "end",
            oninput: (e: Event) => filters.amount.end = (e.target as HTMLInputElement).value
          }),
        ),
      ),
      div({ class: "buttons" },
        button({
          class: "button is-primary",
          type: "button",
          onclick: () => emitter.emit("search", filters)
        }, "Apply"),
        button({
          class: "button is-secondary",
          type: "reset",
          onclick: () => reset(),
        }, "Reset"),
      ),
    ),
  );
}