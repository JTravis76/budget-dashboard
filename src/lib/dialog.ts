/* Dialog plugin
 * This plugin creates a dialog message with a promise to to return a result. There is two types of
 * dialog, Information (Ok) and Confirmation (Yes || No).
 */
import van from "vanjs-core";

const { dialog, button, div, p } = van.tags;
//---------------------------------------------
type ControlType = "ok" | "yesno";

interface IDialogOption {
  title: string;
  message: string;
  backdrop?: boolean;
  type?: ControlType;
}
//---------------------------------------------
async function createDialog(opt?: string | IDialogOption): Promise<boolean> {
  let defaultOpt = {
    message: "Place your confirmation message here",
    backdrop: true,
    title: "Confirmation ?",
    type: "ok",
  } as IDialogOption;

  if (typeof opt === "string") defaultOpt.message = opt;
  else defaultOpt = Object.assign(defaultOpt, opt);
  //---------------------------------------------
  return new Promise((r) => {
    const dlg = dialog(
      div(
        {
          class: "is-size-5 has-text-weight-bold",
          style: "border-bottom: 1px solid lightgray;"
        },
        defaultOpt.title
      ),
      p({ class: "m-2" }, defaultOpt.message),
      defaultOpt.type == "ok"
        ? div({ class: "is-pulled-right" },
          button(
            {
              type: "button",
              class: "button is-small is-default",
              onclick: () => {
                dlg.close("OK");
                r(dlg.returnValue == "OK");
                dlg.remove();
              }
            },
            "Ok",
          )
        )
        : div({ class: "buttons is-pulled-right" },
          button(
            {
              type: "button",
              class: "button is-small is-primary",
              onclick: () => {
                dlg.close("YES");
                r(dlg.returnValue == "YES");
                dlg.remove();
              }
            },
            "Yes",
          ),
          button(
            {
              type: "button",
              class: "button is-small is-default",
              onclick: () => {
                dlg.close("NO");
                r(dlg.returnValue == "NO");
                dlg.remove();
              }
            },
            "No",
          ),
        ),
    );


    const app = document.getElementById("app");
    if (app) {
      van.add(app, dlg);
      if (defaultOpt.backdrop) dlg.showModal();
      else dlg.show();
    }
  });
}

export default createDialog;