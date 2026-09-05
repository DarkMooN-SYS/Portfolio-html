export function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-tags]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      buttons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      cards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(/\s+/);
        card.classList.toggle("is-hidden", !(filter === "all" || tags.includes(filter)));
      });
    });
  });
}