export function setupCopy(toast) {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        toast("Copied to clipboard");
      } catch {
        toast("Could not copy");
      }
    });
  });
}