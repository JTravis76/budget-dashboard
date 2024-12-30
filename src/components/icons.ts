/** SVG
 * I learn something new when trying to render a SVG within a HTML document.
 * The SVG would be listed in the DevTools -> Elements tab, but not be displayed
 * in the browser. However, copy/paste the "same" SVG + Path in DevTools it would
 * rendered as expected. It turns out that SVG and Path tags require a Namespace.
 * VanJs behind the scene creates elements like so.
 * document.createElement("svg") vs document.createElementNS("http://www.w3.org/2000/svg", "svg")
 * 
 * So I had to pass the required namespace to force the createElementNS() method.
 * 
 * Here is a great place to find icons: https://icon-sets.iconify.design/
 */
import van from "vanjs-core"

const { svg, path, g } = van.tags("http://www.w3.org/2000/svg");
//-------------------------------------------
interface IProp {
  class?: string;
  width?: string;
  height?: string;
}
//-------------------------------------------
export const IconDownload = (props?: IProp) => {
  return svg(
    {
      class: props?.class ?? "",
      xmlns: "http://www.w3.org/2000/svg",
      width: props?.width ?? "50",
      height: props?.height ?? "43",
      viewBox: "0 0 50 43"
    },
    path({ d: "M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z" }),
  );
}
//-------------------------------------------
export const IconEdit = (props?: IProp) => {
  return svg(
    {
      class: props?.class ?? "",
      xmlns: "http://www.w3.org/2000/svg",
      width: props?.width ?? "24",
      height: props?.height ?? "24",
      viewBox: "0 0 24 24"
    },
    g(
      {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeEidth: "2"
      },
      path({ d: "M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" }),
      path({ d: "M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" }),
    ),
  );
}
//-------------------------------------------
export const IconRemove = (props?: IProp) => {
  return svg(
    {
      class: props?.class ?? "",
      xmlns: "http://www.w3.org/2000/svg",
      width: props?.width ?? "24",
      height: props?.height ?? "24",
      viewBox: "0 0 24 24"
    },
    path(
      {
        fill: "currentColor",
        d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
      }),
  );
}
//-------------------------------------------
