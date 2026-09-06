import { createToast } from "./modules/toast.js";
import { setupMenu } from "./modules/menu.js";
import { setupClock } from "./modules/clock.js";
import { setupCopy } from "./modules/copy.js";
import { setupContactForm } from "./modules/contact-form.js";
import { setupFilters } from "./modules/filters.js";
import { setupYear } from "./modules/year.js";
import { setupBgScene } from "./modules/bg-scene.js";

document.addEventListener("DOMContentLoaded", () => {
  const toast = createToast();
  setupBgScene();
  setupMenu();
  setupClock();
  setupCopy(toast);
  setupContactForm(toast);
  setupFilters();
  setupYear();
});
