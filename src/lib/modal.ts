export const modal = {
  open(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("is-active");
    }
  },
  close(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("is-active");
    }
  },
  toggle(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle("is-active");
    }
  },
};
