export function createToast() {
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.setAttribute("role", "status");
  document.body.appendChild(toastEl);
  let timer;
  return function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  };
}