import van from "vanjs-core";

const { div, img } = van.tags;

export const Home = () => {
  return div(
    img({ src: "./splash.jpg" })
  );
};