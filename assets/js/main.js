import { createToast } from "./modules/toast.js";
import { setupMenu } from "./modules/menu.js";
import { setupClock } from "./modules/clock.js";
import { setupCopy } from "./modules/copy.js";
import { setupContactForm } from "./modules/contact-form.js";
import { setupFilters } from "./modules/filters.js";
import { setupYear } from "./modules/year.js";

document.addEventListener("DOMContentLoaded", () => {
  const toast = createToast();
  setupMenu();
  setupClock();
  setupCopy(toast);
  setupContactForm(toast);
  setupFilters();
  setupYear();
});
