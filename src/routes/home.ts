import van from "vanjs-core";

export const Home = () => {
  const { div, img } = van.tags;
  //---------------------------------------------
  return div(
    img({ src: "./splash.jpg" })
  );
};