/** Toggle Switch
 * 
 */
import van from "vanjs-core";
import emitter from "../lib/event-emitter";

interface IProp {
  id: string;
  offLabel: string | Element;
  onLabel: string | Element;
  state: boolean;
}

export const ToggleSwitch = (props: IProp) => {
  const { div, input, label } = van.tags;
  let selected = van.state(props?.state);
  //---------------------------------------------
  return div({ class: "toggle-switch--container" },
    div(props?.offLabel ?? "Off"),
    input(
      {
        type: "checkbox",
        id: props?.id ?? "sw-1",
        name: props?.id ?? "sw-1",
        checked: () => selected.val,
        onchange: (e: Event) => {
          selected.val = (e.target as HTMLInputElement).checked;
          emitter.emit("toggle", selected.val);
        }
      }
    ),
    label({ for: props?.id ?? "sw-1" }),
    div(props?.onLabel ?? "On")
  );
}