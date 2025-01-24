import van from "vanjs-core";
import $store from "../stores";

const { div, h4, p, button, input, label, br } = van.tags;

export const SettingTagRule = () => {
  let runType = van.state(0);
  let style = "border-left: 2px solid; padding-left: 10px;";
  //---------------------------------------------
  function ruleRules() {
    //fetch all rules & transactions and generate a tag
    $store.dashboard.getAllTransactions().then((res) => {
      if (res === 200) {
        let transactions = new Array<ITransaction>();
        if (runType.val === 0) {
          $store.dashboard.transactions.val
            .filter((x) => x.tag == null || x.tag == "")
            .forEach((t) => {
              t.tag = $store.tag.generateTag(t);
              transactions.push(t);
            });
        }
        else if (runType.val === 1) {
          $store.dashboard.transactions.val
            .forEach((t) => {
              t.tag = $store.tag.generateTag(t);
              transactions.push(t);
            });
        }

        if (transactions.length > 0) {
          $store.transaction.saveTransactions(transactions)
            .then((res) => {
              if (res === 200)
                window.setTimeout(() => window.location.reload(), 1000);
            });
        }
      }
    });
  }
  //---------------------------------------------
  return div({ class: "columns" },
    div({ class: "column is-one-fifth" },
      h4({ class: "title is-4" }, "Tag Rule")
    ),
    div({ class: "column" },
      div({ style },
        p("Start the tag generator."),
        div({ class: "control" },
          label({ class: "radio" },
            input(
              {
                type: "radio",
                name: "runType",
                class: "radio",
                checked: () => runType.val === 0,
                onclick: () => runType.val = 0
              }),
            "Blanks only",
          ),
          br(),
          label({ class: "radio" },
            input(
              {
                type: "radio",
                name: "runType",
                class: "radio",
                checked: () => runType.val === 1,
                onclick: () => runType.val = 1
              }),
            "All records"
          )
        ),
        button({ class: "button is-default", onclick: () => ruleRules() }, "Run Rules"),
      ),
    ),
  );
}