export function setupClock() {
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  if (!hoursEl || !minutesEl || !secondsEl) return;

  function tick() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ulaanbaatar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "--";
    hoursEl.textContent = get("hour");
    minutesEl.textContent = get("minute");
    secondsEl.textContent = get("second");
  }
  tick();
  setInterval(tick, 1000);
}