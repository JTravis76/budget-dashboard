import van from "vanjs-core";

const { a, div, li, p, ul, button, input, span } = van.tags;

// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
export const Home = () => {
  const counter = van.state(0);
  const text = van.state("VanJs is cool");
  const length = van.derive(() => text.val.length);
  // declaring side effects
  //van.derive(() => console.log(`Counter: ${counter.val}`));
  return div(
    p("👋Hello"),
    ul(
      li("🗺️World"),
      li(a({ href: "https://vanjs.org/", target: "_blank" }, "🍦VanJS")),
      li(
        button({
          disabled: () => counter.val > 9,
          onclick: () => {
            if (counter.val <= 9) counter.val++;
          },
        }, "👍"),
        button({
          disabled: () => counter.val === 0,
          onclick: () => {
            if (counter.val > 0) counter.val--;
          },
        }, "👎"),
      ),
      li("count: ", counter),
      li(
        span(
          "The length of ",
          input({
            type: "text",
            value: text,
            oninput: (e: Event) => text.val = (e.target as HTMLInputElement).value
          }),
          //` is ${length.val}.`,
          " is ",
          length,
          ".",
        ),
      ),
      li(a({ href: "./#/about", target: "_self" }, "About page")),
    ),
  );
};