import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const probe = await page.evaluate(() => {
  const link = document.querySelector("footer a");
  const cs = getComputedStyle(link);
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list;
    try {
      list = sheet.cssRules;
    } catch {
      continue;
    }
    const walk = (rules, layer) => {
      for (const r of rules) {
        if (r.cssRules) {
          walk(r.cssRules, r.name ? r.name : layer);
          continue;
        }
        if (!r.selectorText) continue;
        if (
          r.selectorText.includes("text-cloud-medium") ||
          r.selectorText.includes("t-caption") ||
          r.selectorText === "*" ||
          r.selectorText === "a"
        ) {
          rules.push({ layer, sel: r.selectorText, css: r.style.cssText.slice(0, 90) });
        }
      }
    };
    walk(list, null);
  }

  // measure a spacing utility directly
  const div = document.createElement("div");
  div.className = "mt-6 pt-8";
  div.style.display = "block";
  document.body.appendChild(div);
  const m = getComputedStyle(div);
  const spacer = { marginTop: m.marginTop, paddingTop: m.paddingTop };
  div.remove();

  return {
    color: cs.color,
    cls: link.className,
    matchedColorRule: rules,
    spacer,
    sheets: [...document.styleSheets].map((s) => s.href || "inline"),
  };
});

console.log("footer link color:", probe.color);
console.log("footer link class:", probe.cls);
console.log("stylesheets:", probe.sheets);
console.log("spacer (expect 24px / 32px):", probe.spacer);
console.log("\nmatching rules:");
for (const r of probe.matchedColorRule) console.log(`  [${r.layer ?? "UNLAYERED"}] ${r.sel}  { ${r.css} }`);

await browser.close();