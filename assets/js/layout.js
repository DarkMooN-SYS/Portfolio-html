(function () {
  const page = document.body.dataset.page || "home";
  const root = document.body.dataset.root || "./";
  const home = `${root}index.html`;
  const work = `${root}pages/work.html`;
  const about = `${root}pages/about.html`;
  const contact = `${root}pages/contact.html`;
  const resume = `${root}pages/resume.html`;

  const link = (href, key, label) =>
    `<a class="nav-link${page === key ? " is-active" : ""}" href="${href}">${label}</a>`;

  function injectHeader() {
    if (document.querySelector(".site-header")) return;

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <div class="site-header__inner">
        <a class="site-logo" href="${home}">
          <span class="site-logo__mark"><span class="material-symbols-outlined text-[20px]">terminal</span></span>
          DarkMooN
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${link(work, "work", "Work")}
          ${link(about, "about", "About")}
          ${link(contact, "contact", "Contact")}
        </nav>
        <div class="site-header__actions">
          ${
            page === "resume"
              ? `<button class="btn-resume" type="button" data-print>Print / PDF</button>`
              : `<a class="btn-resume" href="${resume}"><span class="material-symbols-outlined text-[18px]">download</span>Resume</a>`
          }
          <button id="mobile-menu-button" class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      <nav id="mobile-menu" class="mobile-nav is-hidden" aria-label="Mobile">
        <div class="px-4 py-4 max-w-7xl mx-auto">
          ${link(work, "work", "Work")}
          ${link(about, "about", "About")}
          ${link(contact, "contact", "Contact")}
          ${page === "resume" ? "" : `<a class="btn-resume mt-3" href="${resume}" style="display:inline-flex">Resume</a>`}
        </div>
      </nav>
    `;

    const skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main";
    skip.textContent = "Skip to content";

    document.body.prepend(header);
    document.body.prepend(skip);
    header.querySelector("[data-print]")?.addEventListener("click", () => window.print());
  }

  function injectFooter() {
    if (document.querySelector(".site-footer")) return;

    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="site-footer__inner">
        <p>© <span data-year></span> DarkMooN. Built in Ulaanbaatar.</p>
        <div class="flex gap-5">
          <a href="https://github.com/DarkMooN-SYS" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="${contact}">Contact</a>
          <a href="${resume}">Resume</a>
        </div>
      </div>
    `;

    const main = document.getElementById("main");
    if (main) {
      main.after(footer);
    } else {
      document.body.append(footer);
    }
  }

  function injectBg() {
    if (document.getElementById("bg-scene")) return;
    const canvas = document.createElement("canvas");
    canvas.id = "bg-scene";
    canvas.className = "bg-scene";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
  }

  injectBg();
  injectHeader();

  if (document.getElementById("main")) {
    injectFooter();
  } else {
    document.addEventListener("DOMContentLoaded", injectFooter);
  }
})();
