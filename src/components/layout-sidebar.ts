import van from "vanjs-core";

export const LayoutSideBar = () => {
  const { aside } = van.tags;
  //-------------------------------------------
  return aside({ class: "sidebar-left" });
}