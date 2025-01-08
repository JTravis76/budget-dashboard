import van from "vanjs-core";

const { div, h1, a } = van.tags;

export const NotFound = () => {
  return div({ class: "container mt-2" },
    div({ class: "box mt-2" },
      h1({ class: "is-size-3" }, "Oops! We broke a link"),
      "Take me ",
      a({ href: "./" }, "home,"),
      " county road."
    ),
  );
};