import van from "vanjs-core";
import { IconEllipsisV, IconEdit, IconNewFolder, IconTrash } from "./icons";
import emitter from "../lib/event-emitter";

const { div, button, a, hr } = van.tags;

export const MiniMenu = (props: { id: number }) => {
  let active = van.state(false);

  return div(
    button({
      type: "button", onclick: () => {
        active.val = !active.val;
      }
    },
      IconEllipsisV(),
    ),
    div({ class: () => active.val ? "mini-menu active" : "mini-menu" },
      div({ class: "" },
        a(
          {
            class: "mini-menu-item",
            href: "#",
            onclick: (e: Event) => {
              e.preventDefault();
              active.val = false;
              emitter.emit("edit", props.id)
            }
          }, IconEdit(), "Edit Transaction"),
        a({
          class: "mini-menu-item",
          href: "#",
          onclick: (e: Event) => {
            e.preventDefault();
            active.val = false;
            emitter.emit("tag", props.id)
          }
        }, IconNewFolder(), "Create Tag"),
        hr({ class: "mini-menu-divider" }),
        a({
          style: "color: hsl(348deg,100%,70%)",
          class: "mini-menu-item",
          href: "#",
          onclick: (e: Event) => {
            e.preventDefault();
            active.val = false;
            emitter.emit("remove", props.id)
          }
        }, IconTrash(), "Delete Transaction"),
      )
    ),
  );
}