import van from "vanjs-core";

const { div, br, a } = van.tags;

export const About = () => {
  return div(
    "This is the about page",
    br(),
    a({ href: "/" }, "back to home"),
    br(),
    a({ href: "/test" }, "Test page"),
  );
}