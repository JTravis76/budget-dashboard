import van from "vanjs-core";

const { div } = van.tags;

export const PageLoader = () => {
  return div(
    { class: "loading-bg" },
    div(
      { class: "loading-container" },
      div({ class: "loader" }),
    ),
  );
}