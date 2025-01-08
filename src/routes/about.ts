import van from "vanjs-core";

const { div, p } = van.tags;

export const About = () => {
  return div({ class: "container mt-2" },
    div({ class: "box" },
      p("Welcome to the About page."),
      p(" More information to come..."),
    )
  );
}