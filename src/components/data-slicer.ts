/* Data Slicer is a component that provides either a selection of options or a single search field.
 * And it act as a method to filter [ALL] other components on the page. Basically, a Page Filter.
 * The goal here is to pass in the props to set the initial slicer-type and data for the control.
 * Any changes to the control (data selection, etc) is emitted back to the parent to process the filtering.
 * This component also contains a few states to assist end-user; expand/collapse and active/unactive. */
import van from "vanjs-core";
import emitter from "../lib/event-emitter";
import { IconEraser } from "./icons";

const { div, button, span, label, input } = van.tags;
//---------------------------------------------
export const DataSlicer = (props: ISlicer) => {
  let active = van.state(props.active);
  let collapse = van.state(props.collapse);
  //---------------------------------------------
  if (typeof props.data === "object") {
    active.val = props.data.some((x) => x.selected);
  }
  //---------------------------------------------
  return div({ class: "data-slicer" },
    div({ class: () => active.val ? "slicer_header-panel active" : "slicer_header-panel" },
      button(
        {
          type: "button",
          class: "slicer-header",
          title: "expand or collapse",
          onclick: () => collapse.val = !collapse.val,
        },
        span(props.title)
      ),
      div({ class: "slicer-toolset" },
        button(
          {
            type: "button",
            title: "clear slicer",
            onclick: () => {
              if (Array.isArray(props.data))
                props.data.forEach((x) => x.selected = false);
              else {
                props.data = "";
              }
              props.active = false;
              props.collapse = collapse.val;
              emitter.emit("selection", props);
            }
          },
          IconEraser({ width: "14", height: "14" }),
        ),
      ),
    ),
    div({ class: () => collapse.val ? "slicer-body is-hidden" : "slicer-body" },
      () => Array.isArray(props.data)
        ? div(
          props.data
            .map((i) =>
              div(
                label({ class: () => i.selected ? "has-text-weight-bold" : "" },
                  input(
                    {
                      type: "checkbox",
                      value: i.value,
                      checked: i.selected,
                      onclick: () => {
                        i.selected = !i.selected;
                        active.val = (props.data as ISlicerData[]).some((x) => x.selected);

                        props.active = active.val;
                        props.collapse = collapse.val;
                        emitter.emit("selection", props);
                      }
                    }),
                  span(i.text)
                ),
              ),
            ),
        )
        : input(
          {
            type: "text",
            class: "input is-small",
            placeholder: "search..",
            value: () => props.data,
            onkeyup: (e: KeyboardEvent) => {
              if (e.key === "Enter")
                emitter.emit("selection", props);
            },
            oninput: (e: InputEvent) => {
              let val = (e.target as HTMLInputElement).value;
              active.val = val.length > 0;

              props.data = val;
              props.active = active.val;
              props.collapse = collapse.val;
              //emitter.emit("selection", props);
            }
          }
        ),
    ),
  );
}