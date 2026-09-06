const PHI = (1 + Math.sqrt(5)) / 2;
const ICOSA = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const ICOSA_EDGES = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9], [10, 11],
];

export function setupBgScene() {
  const canvas = document.getElementById("bg-scene");
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const nodeCount = mobile ? 28 : 52;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: (Math.random() - 0.5) * 900,
    y: (Math.random() - 0.5) * 520,
    z: Math.random() * 700 - 180,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.18,
    vz: (Math.random() - 0.5) * 0.28,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;
  let raf = 0;
  let running = true;
  let rotY = 0.18;
  let rotX = 0.42;
  let targetY = 0.18;
  let targetX = 0.42;
  let t = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.4);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rotate(x, y, z, ry, rx) {
    const cy = Math.cos(ry);
    const sy = Math.sin(ry);
    const x1 = x * cy - z * sy;
    const z1 = z * cy + x * sy;
    const cx = Math.cos(rx);
    const sx = Math.sin(rx);
    const y1 = y * cx - z1 * sx;
    const z2 = z1 * cx + y * sx;
    return { x: x1, y: y1, z: z2 };
  }

  function project(x, y, z) {
    const p = rotate(x, y, z, rotY, rotX);
    const depth = 520 + p.z;
    const scale = 520 / Math.max(depth, 80);
    return {
      x: width * 0.52 + p.x * scale,
      y: height * 0.42 + p.y * scale,
      s: scale,
      z: p.z,
    };
  }

  function drawGrid() {
    const cols = mobile ? 10 : 16;
    const rows = mobile ? 8 : 12;
    const span = 1100;
    const step = span / cols;
    const y = 240;
    const z0 = -120;
    const z1 = 620;

    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      const x = -span / 2 + i * step;
      const a = project(x, y, z0);
      const b = project(x, y, z1);
      const fade = 0.08 + (i / cols) * 0.06;
      ctx.strokeStyle = `rgba(13, 242, 13, ${fade})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      const z = z0 + (j / rows) * (z1 - z0);
      const a = project(-span / 2, y, z);
      const b = project(span / 2, y, z);
      const fade = 0.05 + (1 - j / rows) * 0.1;
      ctx.strokeStyle = `rgba(13, 242, 13, ${fade})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  function drawIcosa() {
    drawWire(
      mobile ? 20 : -380,
      mobile ? -40 : -90,
      40,
      (mobile ? 90 : 118) + Math.sin(t * 0.7) * 6,
      t * 0.55,
      mobile ? 0.32 : 0.45
    );
    if (!mobile) {
      drawWire( 420, 30, 120, 62, -t * 0.38, 0.28);
    }
  }

  function drawWire(ox, oy, oz, scale, spin, alpha) {
    const pts = ICOSA.map(([x, y, z]) => {
      const r = rotate(x * scale, y * scale, z * scale, spin, spin * 0.38);
      return project(r.x + ox, r.y + oy, r.z + oz);
    });

    ctx.lineWidth = 1.35;
    ctx.strokeStyle = `rgba(13, 242, 13, ${alpha})`;
    ctx.beginPath();
    for (const [i, j] of ICOSA_EDGES) {
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[j].x, pts[j].y);
    }
    ctx.stroke();

    for (const p of pts) {
      const r = 1.4 + p.s * 1.3;
      ctx.fillStyle = `rgba(13, 242, 13, ${Math.min(alpha + 0.2, 0.7)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawNodes() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
      if (n.x < -480 || n.x > 480) n.vx *= -1;
      if (n.y < -280 || n.y > 280) n.vy *= -1;
      if (n.z < -220 || n.z > 560) n.vz *= -1;
    }

    const projected = nodes.map((n) => {
      const p = project(n.x, n.y, n.z);
      return { ...p, src: n };
    });

    ctx.lineWidth = 0.7;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const a = projected[i].src;
        const b = projected[j].src;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist > 168) continue;
        const alpha = (1 - dist / 168) * 0.14;
        ctx.strokeStyle = `rgba(13, 242, 13, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
        ctx.stroke();
      }
    }

    for (const p of projected) {
      const r = 1.1 + p.s * 1.8;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
      g.addColorStop(0, "rgba(13, 242, 13, 0.55)");
      g.addColorStop(1, "rgba(13, 242, 13, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame() {
    if (!running) return;
    t += 0.008;
    rotY += (targetY - rotY) * 0.04;
    rotX += (targetX - rotX) * 0.04;

    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawNodes();
    drawIcosa();
    raf = requestAnimationFrame(frame);
  }

  function onPointer(e) {
    const nx = e.clientX / width - 0.5;
    const ny = e.clientY / height - 0.5;
    targetY = 0.18 + nx * 0.35;
    targetX = 0.42 + ny * 0.22;
  }

  function onVisibility() {
    running = document.visibilityState === "visible";
    if (running) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(frame);
}
