import van from "vanjs-core";

const { div, p } = van.tags;

export const About = () => {
  return div({ class: "box mt-2" },
    p("Welcome to the About page."),
    p(" More information to come..."),
  );
}