/* Another route component to display a collection of tag rules.
 * Since the rules are a unique key-pair type dictionary, we had to get
 * creative with the map() and Object keys/value to build the data-grid.
 * We are also using a simple loading state to repaint the data-grid for
 * any changed that was triggered.
 * 
 * Editing a tag is sent to the store for processing, then displayed within
 * the Form-Rule-Builder component.
 * Removing a rule is first asking for confirmation. */
import van from "vanjs-core";
import { FormRuleBuilder } from "../components/form-rule-builder";
import { IconEdit, IconRemove } from "../components/icons";
import $store from "../stores";
import $dialog from "../lib/dialog";

const { div, strong, button } = van.tags;

export const RuleBuilder = async () => {
  await $store.tag.getRules();
  //---------------------------------------------
  let { rules, loading } = $store.tag;
  //---------------------------------------------
  function remove(name: string, rule: IRuleProperty) {
    $dialog({
      title: "Confirmation",
      type: "yesno",
      message: "Are you sure you want to remove this tag?"
    }).then((res) => {
      if (res) $store.tag.removeRule(name, rule);
    });
  }
  //---------------------------------------------
  loading.val = false;
  //---------------------------------------------
  return div({ class: "container mt-2" },
    FormRuleBuilder(),
    () => loading.val
      ? div({ class: "skeleton-block" })
      : div({ class: "box" },
        strong(() => rules.val.length == 0 ? "No rules found." : ""),
        rules.val.map((r) => {
          const name = Object.keys(r)[0];
          const defs = Object.values(r)[0]?.sort((a, b) => a.amount < b.amount ? 1 : -1);

          return div({ class: "columns rule-bordered" },
            div({ class: "column" }, strong(name)),
            div({ class: "column" },
              defs.map((d) =>
                div({ class: "columns" },
                  div({ class: "column" }, `$${d.amount?.toFixed(2)}`),
                  div({ class: "column" }, d.tag),
                  div({ class: "column" },
                    div({ class: "buttons" },
                      button(
                        {
                          class: "button is-small is-outlined is-primary",
                          onclick: () => $store.tag.setRule(name, d),
                          title: "Edit"
                        }, IconEdit()),
                      button(
                        {
                          class: "button is-small is-outlined is-danger",
                          onclick: () => remove(name, d),
                          title: "Remove",
                        }, IconRemove()),
                    )
                  )
                )
              )// end inner map
            ),
          );
        }),// end outer map
      ),
  );
}