/** Modal Frame
 * This component provide a simple modal shell for displaying content.
 * It does make use of Props, Slot, and Emitter.
 * The modal open/close action is controlled by the modal plugin library.
 * The Props and Slot arguments are passed into the component.
 * Slot is any HTML element you wish to display with-in the content body of the modal.
 * The "Save" button fires the emitter back to the parent component.
 */
import van from "vanjs-core";
import $modal from "../lib/modal";
import emitter from "../lib/event-emitter";

const { div, header, p, section, footer, button } = van.tags;
//-------------------------------------------
interface IProp {
  id: string;
  title: string;
  footer?: boolean;
}
//-------------------------------------------
export const ModalFrame = (props: IProp, slot: Element) => {
  const close = () => $modal.close(props.id);
  //-------------------------------------------
  return div(
    { id: props.id, class: "modal" },
    div({ class: "modal-background" }),
    div(
      { class: "modal-card" },
      header(
        { class: "modal-card-head" },
        p({ class: "modal-card-title" }, props.title),
        button({
          class: "delete",
          ariaLabel: "close",
          onclick: close,
        }),
      ),
      section({ class: "modal-card-body" }, slot),
      () => props.footer
        ? footer(
          { class: "modal-card-foot" },
          div(
            { class: "buttons" },
            button(
              {
                class: "button is-success",
                onclick: () => emitter.emit("action"),
              },
              "Save",
            ),
            button(
              { class: "button", onclick: close },
              "Cancel",
            ),
          ),
        )
        : div()
    ),
  );
};
