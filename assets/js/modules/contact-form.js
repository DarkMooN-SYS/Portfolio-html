export function setupContactForm(toast) {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const inbox = "puntsagluvsan3@gmail.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || "Project inquiry";
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      toast("Please fill in name, email, and message");
      return;
    }

    if (button) {
      button.disabled = true;
      button.classList.add("opacity-70");
    }

    try {
      const body = new URLSearchParams({
        name,
        email,
        subject,
        message,
        _replyto: email,
        _subject: `Portfolio — ${subject}`,
        _template: "table",
      });
      const response = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "Send failed");
      }
      form.reset();
      toast("Sent. Check Gmail — confirm the first message once.");
    } catch {
      toast("Could not send. Email me at puntsagluvsan3@gmail.com");
    } finally {
      if (button) {
        button.disabled = false;
        button.classList.remove("opacity-70");
      }
    }
  });
}
