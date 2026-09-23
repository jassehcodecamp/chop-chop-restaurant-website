import "./style.css";

const button = document.querySelector<HTMLButtonElement>("[data-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const panel = document.querySelector<HTMLElement>("[data-panel]");

if (button && menu && panel) {
  const iconOpen = button.querySelector<HTMLElement>("[data-icon-open]");
  const iconClose = button.querySelector<HTMLElement>("[data-icon-close]");
  const scrim = menu.querySelector<HTMLButtonElement>("[data-scrim]");
  const page = document.querySelectorAll<HTMLElement>("main, footer");
  let closeTimer = 0;

  const setOpen = (open: boolean) => {
    window.clearTimeout(closeTimer);

    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
    iconOpen?.toggleAttribute("hidden", open);
    iconClose?.toggleAttribute("hidden", !open);
    document.body.classList.toggle("overflow-hidden", open);
    page.forEach((region) => {
      region.inert = open;
    });

    if (open) {
      menu.hidden = false;
      menu.classList.remove("hidden");
      panel.classList.add("translate-x-full");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (button.getAttribute("aria-expanded") === "true") {
            panel.classList.remove("translate-x-full");
          }
        });
      });
      return;
    }

    panel.classList.add("translate-x-full");
    closeTimer = window.setTimeout(() => {
      if (button.getAttribute("aria-expanded") === "true") return;
      menu.hidden = true;
      menu.classList.add("hidden");
      button.focus({ preventScroll: true });
    }, 200);
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a");
    if (!link || !menu.contains(link)) return;
    setOpen(false);
  });

  scrim?.addEventListener("click", () => {
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (button.getAttribute("aria-expanded") === "true") setOpen(false);
  });

  const desktop = window.matchMedia("(min-width: 40rem)");
  desktop.addEventListener("change", () => {
    if (desktop.matches && button.getAttribute("aria-expanded") === "true") {
      setOpen(false);
    }
  });
}
