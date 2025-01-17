import van from "vanjs-core";

const { div, iframe } = van.tags;

export const About = () => {
  return div({ class: "container mt-2" },
    div({ class: "box" },
      iframe({
        src: "./README.html",
        style: "width: 100%;",
        onload: (e: Event) => {
          let iframe = e.target as HTMLIFrameElement;
          if (iframe.contentWindow) {
            const body = iframe.contentWindow.document.body;
            iframe.style.height = (body.scrollHeight + 250).toString() + "px";
            //iframe.style.width = (body.scrollWidth + 20).toString() + "px";
          }
        }
      })
    ),
  );
}