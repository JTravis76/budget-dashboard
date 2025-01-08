import van from "vanjs-core";
import $store from "../stores";

const { header, nav, div, a, span, hr, strong } = van.tags;

export const LayoutHeader = () => {
  let expanded = van.state(false);
  return header(
    { class: "" },
    nav(
      { class: "navbar", role: "navigation", ariaLabel: "main navigation" },
      div(
        { class: "navbar-brand" },
        a({ class: "navbar-item is-selected", href: "./" }, "Budget Dashboard"),
        a(
          {
            role: "button",
            class: () => expanded.val ? "navbar-burger is-active" : "navbar-burger",
            ariaLabel: "menu",
            onclick: () => expanded.val = !expanded.val
          },
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
          span({ ariaHidden: true }),
        ),
      ),
      div(
        {
          class: () => expanded.val ? "navbar-menu is-active" : "navbar-menu",
        },
        div(
          { class: "navbar-start" },
          () => $store.user.authenticated.val
            ? a({ class: "navbar-item", href: "./#/dashboard" }, "Dashboard")
            : "",
          () => $store.user.authenticated.val
            ? a({ class: "navbar-item", href: "./#/transactions" }, "Transactions")
            : "",
          div(
            { class: "navbar-item has-dropdown is-hoverable" },
            a({ class: "navbar-link" }, "More"),
            div(
              { class: "navbar-dropdown" },
              a({ class: "navbar-item", href: "./#/about" }, "About"),
              hr({ class: "navbar-divider" }),
              a({ class: "navbar-item", href: "./#/issue" }, "Report an issue"),
            ),
          ),
        ),
      ),
      div(
        { class: "navbar-end" },
        div(
          { class: "navbar-item" },
          () => (window.location.hash !== "#/login")
            ? div(
              { class: "buttons" },
              // a({ class: "button is-primary" }, strong("Sign Up")),
              () => $store.user.authenticated.val
                ? a(
                  {
                    class: "button is-outline-light",
                    href: "#",
                    onclick: (e: Event) => {
                      e.preventDefault();
                      $store.user.signout().then(() => {
                        window.location.href = "/";
                      });
                    }
                  },
                  strong("Sign Out")
                )
                : a({ class: "button is-light", href: "./#/login" }, strong("Log in")),

            )
            : "",
        ),
      ),
    ),
  );
};
