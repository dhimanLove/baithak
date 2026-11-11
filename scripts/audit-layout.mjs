import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3111";
const target = process.argv[2] || "/";
const width = Number(process.argv[3] || 1280);

function lum(hex) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const contrast = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.setViewportSize({ width, height: 900 });
await page.goto(BASE + target, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1600);

const data = await page.evaluate(() => {
  const out = [];
  const walk = (el, depth) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    if (r.width === 0 && r.height === 0) return;
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(" ")
      .slice(0, 90);
    out.push({
      depth,
      tag: el.tagName.toLowerCase(),
      cls: (el.className || "").toString().slice(0, 70),
      x: Math.round(r.x),
      y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
      fs: cs.fontSize,
      fw: cs.fontWeight,
      lh: cs.lineHeight,
      ff: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
      color: cs.color,
      bg: cs.backgroundColor,
      display: cs.display,
      text,
    });
    if (depth < 7) for (const c of el.children) walk(c, depth + 1);
  };
  walk(document.body, 0);
  return {
    out,
    docH: document.documentElement.scrollHeight,
    docW: document.documentElement.scrollWidth,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
  };
});

console.log(`=== ${target} @ ${width}px  height=${data.docH} overflowX=${data.overflowX} ===`);
for (const e of data.out) {
  if (e.tag === "script" || e.tag === "style" || e.tag === "link") continue;
  const pad = "  ".repeat(e.depth);
  const geo = `${String(e.x).padStart(4)},${String(e.y).padStart(5)} ${String(e.w).padStart(4)}x${String(e.h).padStart(4)}`;
  const style = `${e.fs.padStart(6)}/${e.lh.replace("normal", "n").padStart(7)} w${e.fw} ${e.ff.slice(0, 14).padEnd(14)} ${e.color}`;
  console.log(`${pad}${e.tag}.${e.cls.slice(0, 34).padEnd(34)} ${geo}  ${style}${e.text ? "  | " + e.text : ""}`);
}

// contrast report for leaf text nodes
const contrasts = await page.evaluate(() => {
  const res = [];
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(",").map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const composite = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  const bgOf = (el) => {
    const stack = [];
    let n = el;
    while (n) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a >= 1) break;
      }
      n = n.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) base = composite(stack[i], base);
    return base;
  };
  const str = (c) => `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`;

  for (const el of document.querySelectorAll("*")) {
    const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own.length) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    const bg = bgOf(el);
    const fg = parse(cs.color);
    res.push({
      cls: (el.className || "").toString().slice(0, 40),
      fs: parseFloat(cs.fontSize),
      fw: cs.fontWeight,
      color: str(fg ? composite(fg, bg) : bg),
      bg: str(bg),
      text: own.map((n) => n.textContent.trim()).join(" ").slice(0, 50),
    });
  }
  return res;
});

console.log("\n--- CONTRAST (WCAG AA: 4.5 normal, 3.0 >=24px) ---");
for (const c of contrasts) {
  const toHex = (v) => {
    const m = v.match(/\d+/g);
    if (!m) return v;
    return "#" + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, "0")).join("");
  };
  const ratio = contrast(toHex(c.color), toHex(c.bg));
  const large = c.fs >= 24 || (c.fs >= 18.66 && +c.fw >= 700);
  const need = large ? 3 : 4.5;
  const flag = ratio < need ? "FAIL" : "ok  ";
  if (flag === "FAIL" || process.env.ALL)
    console.log(`${flag} ${ratio.toFixed(2)} (need ${need}) ${c.fs}px w${c.fw} ${c.cls}  "${c.text}"`);
}

await browser.close();