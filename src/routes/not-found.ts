import van from "vanjs-core";

const { div, h1, a } = van.tags;

export const NotFound = () => {
  return div(
    h1("Oops! We broke a link"),
    a({ href: "/"}, "Take me home")
  );
};