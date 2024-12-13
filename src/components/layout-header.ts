import van from "vanjs-core";

const { header, nav, div, a, span, hr, strong } = van.tags;

export const LayoutHeader = () => {
  return header(
    { class: "" },
    nav(
      { class: "navbar", role: "navigation", ariaLabel: "main navigation" },
      div(
        { class: "navbar-brand" },
        a({ class: "navbar-item is-selected", href: "/" }, "Budget Dashboard"),
        a(
          {
            role: "button",
            class: "navbar-burger",
            ariaLabel: "menu",
            ariaExpanded: "false",
            dataTarget: "navbarBasicExample",
          },
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
        ),
      ),
      div(
        { class: "navbar-menu" },
        div(
          { class: "navbar-start" },
          a({ class: "navbar-item", href: "./transactions" }, "Transactions"),
          div(
            { class: "navbar-item has-dropdown is-hoverable" },
            a({ class: "navbar-link" }, "More"),
            div(
              { class: "navbar-dropdown" },
              a({ class: "navbar-item", href: "./about" }, "About"),
              hr({ class: "navbar-divider" }),
              a({ class: "navbar-item" }, "Report an issue"),
            ),
          ),
        ),
      ),
      div(
        { class: "navbar-end" },
        div(
          { class: "navbar-item" },
          div(
            { class: "buttons" },
            a({ class: "button is-primary" }, strong("Sign Up")),
            a({ class: "button is-light" }, "Log in"),
          ),
        ),
      ),
    ),
  );
};
