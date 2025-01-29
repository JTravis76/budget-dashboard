import van from "vanjs-core";
import $dialog from "../lib/dialog";
import $store from "../stores";
import $toast from "../lib/toast";

const { div, h4, p, button } = van.tags;

export const SettingResetDb = () => {
  let style = "border-left: 2px solid; padding-left: 10px;";
  //---------------------------------------------
  return div({ class: "columns" },
    div({ class: "column is-one-fifth" },
      h4({ class: "title is-4" }, "Reset")
    ),
    div({ class: "column" },
      div({ style },
        p("Reset the database to a clean slate. Make sure you have a backup!"),
        button(
          {
            class: "button is-danger",
            onclick: () => {
              $dialog({
                title: "Reset confirmation?",
                message: "Are you sure you want to reset the database? This cannot be undone.",
                type: "yesno",
              }).then((res) => {
                if (res) {
                  $store.transaction.resetTansactions()
                    .then(() => $toast({ type: "success", message: "Database reset successful." }));
                }
              });
            }
          }, "Reset"),
      ),
    ),

  );
}