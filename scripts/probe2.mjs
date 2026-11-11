import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const out = await page.evaluate(() => {
  const root = getComputedStyle(document.documentElement);
  const probeEl = document.createElement("span");
  probeEl.className = "text-cloud-medium";
  document.body.appendChild(probeEl);
  const color = getComputedStyle(probeEl).color;
  probeEl.remove();

  let sheetInfo = [];
  for (const s of document.styleSheets) {
    let n = -1;
    let err = "";
    try {
      n = s.cssRules.length;
    } catch (e) {
      err = String(e);
    }
    sheetInfo.push({ href: (s.href || "inline").slice(-40), n, err });
  }

  const sep = getComputedStyle(document.documentElement).getPropertyValue("--color-cloud-medium");
  const cloud = getComputedStyle(document.documentElement).getPropertyValue("--color-cloud-dark");
  return {
    probeColor: color,
    cloudMediumVar: sep,
    cloudDarkVar: cloud,
    sheetInfo,
    spacingVar: getComputedStyle(document.documentElement).getPropertyValue("--spacing"),
  };
});

console.log(JSON.stringify(out, null, 2));
await browser.close();