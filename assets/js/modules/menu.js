export function setupMenu() {
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;
  const icon = button.querySelector(".material-symbols-outlined");

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = !menu.classList.toggle("is-hidden");
    button.setAttribute("aria-expanded", String(open));
    if (icon) icon.textContent = open ? "close" : "menu";
  });

  document.addEventListener("click", (e) => {
    if (!button.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("is-hidden");
      button.setAttribute("aria-expanded", "false");
      if (icon) icon.textContent = "menu";
    }
  });
}