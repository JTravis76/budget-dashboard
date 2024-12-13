import van from "vanjs-core";

const { aside } = van.tags;

export const LayoutSideBar = () => {
  return aside({ class: "sidebar-left" });
}