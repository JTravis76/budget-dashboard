/* This component is a form designer to build or edit rules for generating a tag.
 * The rule is read/save from/to the store. Tag rules is a unique key-pair type
 * dictionary which contain a keyword for searching the transaction name.
 * The pair from the key is an array of rule properties. These properties store the amount
 * threshold and the tag identifier to be returned.
 * 
 * There is a local copy of the form variables to avoid updating the data-grid before the user
 * hits the save button. Ha! I did use the Van.derive() method to sync the local data with the
 * store.  */
import van from "vanjs-core";
import $store from "../stores";

const { div, label, input, select, option, button } = van.tags;

export const FormRuleBuilder = () => {
  //---------------------------------------------
  const { tags, rule } = $store.tag;
  //---------------------------------------------
  let key = "";
  let value = { amount: 0, tag: "" };
  //---------------------------------------------
  let tagSelect = select(
    {
      class: "input",
      onchange: (e: Event) => value.tag = (e.target as HTMLSelectElement).value
    },
    option({ value: "" }, ""),
  );

  van.derive(() => {
    let optionList = new Array<HTMLOptionElement>();
    optionList = tags.val.map((tag) => option({
      value: tag,
      selected: van.derive(() => {
        let v = Object.values(rule.val)[0] ?? { amount: 0, tag: "" };
        value = v;
        return v.tag === tag;
      }),
    }, tag));
    van.add(tagSelect, optionList);
  });
  //---------------------------------------------
  function reset() {
    key = "";
    value = { amount: 0, tag: "" };
    $store.tag.resetRule();
  }
  //---------------------------------------------
  function save() {
    $store.tag.addRule(key, value)
      .then((d) => console.log(d)); // TODO: toast message :)
  }
  //---------------------------------------------
  return div({ class: "box" },
    div({ class: "field" },
      label({ class: "field" }, "Keyword"),
      div(
        { class: "control" },
        input({
          class: "input",
          type: "text",
          placeholder: "EX. Wendy's or Kroger Fuel",
          value: van.derive(() => {
            key = Object.keys(rule.val)[0] ?? "";
            return key;
          }),
          oninput: (e: Event) => key = (e.target as HTMLInputElement).value
        }),
      ),
    ),
    div({ class: "field" },
      label({ class: "field" }, "Amount"),
      div(
        { class: "control" },
        input({
          class: "input",
          type: "number",
          placeholder: "Amount..",
          value: van.derive(() => {
            let r = Object.values(rule.val)[0] ?? { amount: 0, tag: "" };
            return r.amount.toString();
          }),
          oninput: (e: Event) => value.amount = parseFloat((e.target as HTMLInputElement).value),
        }),
      ),
    ),
    div({ class: "field" },
      label({ class: "field" }, "Tags"),
      div(
        { class: "control" },
        tagSelect,
      ),
    ),
    div({ class: "buttons" },
      button({
        class: "button is-primary",
        type: "button",
        onclick: () => save()
      }, "Save"),
      button({
        class: "button is-secondary",
        type: "reset",
        onclick: () => reset(),
      }, "Reset"),
    ),
  );
}