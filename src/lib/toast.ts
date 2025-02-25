import van from "vanjs-core";

type ToastType = "success" | "error" | "default" | "info" | "warning";
type ToastPosition = "top" | "bottom" | "top-right" | "bottom-right" | "top-left" | "bottom-left";

interface IProps {
  type: ToastType;
  position?: ToastPosition;
  message: string;
  dismissible?: boolean;
  duration?: number;
}

export default (props: IProps) => {
  const { div, p } = van.tags;

  let opt = {
    type: "default",
    position: "top",
    message: "",
    dismissible: true,
    duration: 3000,
    enter: "fadeInDown",
    leave: "fadeOut",
  };

  opt = Object.assign(opt, props);

  if (opt.position.includes("bottom")) opt.enter = "fadeInUp";

  let toast = div(
    {
      class: `toast toast-${opt.type} is-${opt.position} ${opt.enter}`,
      role: "alert",
      onclick: (e: Event) => {
        if (!opt.dismissible) return;
        ((e.target as Element).parentNode as HTMLDivElement)?.remove();
      }
    },
    div({ class: "toast-icon" }),
    p({ class: "toast-text" }, opt.message),
  );

  let container = document.querySelector(".notices");

  if (container == null) {
    container = div({ class: `notices is-${opt.position.split("-")[0]}` }) as HTMLDivElement;
    container.appendChild(toast);
    const body = document.body;
    van.add(body, container);
  }
  else {
    container.appendChild(toast);
  }

  if (opt.duration > 0) {
    let id = window.setTimeout(() => {
      toast.classList.remove(opt.enter);
      toast.classList.add(opt.leave);

      window.setTimeout(() => toast.remove(), 1500)
      window.clearTimeout(id);
    }, opt.duration);
  }

}