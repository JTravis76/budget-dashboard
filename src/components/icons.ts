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

const { svg, path, g, circle, animate } = van.tags("http://www.w3.org/2000/svg");
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
export const IconEnvelope = (props?: IProp) => {
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
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5",
        d: "m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087c.46.11.939.11 1.398 0c.52-.125 1.001-.446 1.964-1.087l6.98-4.654M7.157 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327"
      }
    ),
  );
}
//-------------------------------------------
export const IconLock = (props?: IProp) => {
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
        d: "M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"
      }
    ),
  );
}
//-------------------------------------------
export const IconEraser = (props?: IProp) => {
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
        fillRule: "evenodd",
        d: "M13.083 19.063c-.444.444-.843.843-1.21 1.187H21a.75.75 0 0 1 0 1.5H9q-.028 0-.055-.002c-.703-.027-1.3-.331-1.886-.778c-.588-.448-1.244-1.104-2.046-1.907l-.076-.076c-.803-.802-1.459-1.458-1.907-2.046c-.468-.614-.78-1.24-.78-1.989c0-.748.312-1.375.78-1.989c.448-.587 1.104-1.243 1.907-2.046l5.98-5.98c.803-.803 1.459-1.459 2.046-1.907c.614-.468 1.24-.78 1.99-.78c.748 0 1.374.312 1.988.78c.588.448 1.244 1.104 2.046 1.907l.076.076c.803.802 1.459 1.458 1.907 2.046c.468.614.78 1.24.78 1.989c0 .748-.312 1.375-.78 1.989c-.448.587-1.104 1.243-1.907 2.046zM11.94 6.035c.85-.85 1.435-1.433 1.933-1.812c.48-.367.79-.473 1.08-.473c.288 0 .598.106 1.079.473c.497.38 1.083.962 1.933 1.812s1.433 1.436 1.813 1.933c.366.481.472.79.472 1.08c0 .289-.106.599-.473 1.079c-.38.498-.962 1.083-1.812 1.933l-4.194 4.193l-6.024-6.024zM9.048 20.25c.289 0 .599-.106 1.079-.473c.498-.38 1.083-.962 1.933-1.812l.65-.651l-6.024-6.025l-.65.65c-.85.85-1.434 1.436-1.813 1.934c-.367.48-.473.79-.473 1.08c0 .288.106.598.473 1.079c.38.497.962 1.083 1.812 1.933s1.436 1.433 1.933 1.813c.481.366.79.472 1.08.472",
        clipRule: "evenodd",
      }
    ),
  );
}
//-------------------------------------------
export const IconEllipsisV = (props?: IProp) => {
  return svg(
    {
      class: props?.class ?? "",
      xmlns: "http://www.w3.org/2000/svg",
      width: props?.width ?? "16",
      height: props?.height ?? "16",
      viewBox: "0 0 16 16"
    },
    path(
      {
        fill: "currentColor",
        d: "M8 2.5a1.22 1.22 0 0 1 1.25 1.17A1.21 1.21 0 0 1 8 4.84a1.21 1.21 0 0 1-1.25-1.17A1.22 1.22 0 0 1 8 2.5m0 8.66a1.17 1.17 0 1 1-1.25 1.17A1.21 1.21 0 0 1 8 11.16m0-4.33a1.17 1.17 0 1 1 0 2.34a1.17 1.17 0 1 1 0-2.34",
      }
    ),
  );
}
//-------------------------------------------
export const IconNewFolder = (props?: IProp) => {
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
        d: "M14.5 15.5h1v-2h2v-1h-2v-2h-1v2h-2v1h2zM4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h4.981l2 2h7.789q.69 0 1.153.463T21 8.616v8.769q0 .69-.462 1.153T19.385 19zm0-1h14.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T19.385 8h-8.19l-2-2h-4.58q-.269 0-.442.173T4 6.616v10.769q0 .269.173.442t.443.173M4 18V6z",
      }
    ),
  );
}
//-------------------------------------------
export const IconTrash = (props?: IProp) => {
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
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "1.5",
        d: "m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5"
      }
    ),
  );
}
//-------------------------------------------
export const IconThreeDotsLoading = (props?: IProp) => {
  return svg(
    {
      class: props?.class ?? "",
      xmlns: "http://www.w3.org/2000/svg",
      width: props?.width ?? "24",
      height: props?.height ?? "24",
      viewBox: "0 0 24 24"
    },
    circle({ cx: "18", cy: "12", r: "0", fill: "currentColor" },
      animate({
        attributeName: "r",
        begin: ".67",
        calcMode: "spline",
        dur: "1.5s",
        keySplines: "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",
        repeatCount: "indefinite",
        values: "0;2;0;0"
      }),
    ),
    circle({ cx: "12", cy: "12", r: "0", fill: "currentColor" },
      animate({
        attributeName: "r",
        begin: ".33",
        calcMode: "spline",
        dur: "1.5s",
        keySplines: "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",
        repeatCount: "indefinite",
        values: "0;2;0;0"
      }),
    ),
    circle({ cx: "6", cy: "12", r: "0", fill: "currentColor" },
      animate({
        attributeName: "r",
        begin: ".33",
        calcMode: "spline",
        dur: "1.5s",
        keySplines: "0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8",
        repeatCount: "indefinite",
        values: "0;2;0;0"
      }),
    ),
  );
}
//-------------------------------------------