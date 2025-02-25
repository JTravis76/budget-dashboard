import van from "vanjs-core";

export const PageLoader = () => {
  const { div } = van.tags;
  //-------------------------------------------
  return div(
    { class: "loading-bg" },
    div(
      { class: "loading-container" },
      div({ class: "loader" }),
    ),
  );
}