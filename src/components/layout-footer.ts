import van from "vanjs-core";

const { footer, div, p, a } = van.tags;

export const LayoutFooter = () => {
  return footer(
    { class: "footer" },
    div({ class: "content has-text-centered" },
      p("Built with love using ",
        a({ href: "https://bulma.io", target: "_blank" }, "Bulma"),
        " ,",
        a({ href: "https://vanjs.org", target: "_blank" }, "VanJS"),
        " and ",
        a({ href: "https://typescriptlang.org", target: "_blank" }, "TypeScript"),
      ),
    ),
  );
};
