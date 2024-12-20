import van from "vanjs-core";

const { a, div, p, } = van.tags;

export const Home = () => {
  return div(
    p("👋Hello 🗺️World!! ",
      a({ href: "https://vanjs.org/", target: "_blank" }, "🍦VanJS "),
      " is here!",
    ),
    p("This page is marked for greatness. Coming soon.. Charts, Graphs, Data. Oh My!"),
  );
};