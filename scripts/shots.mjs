import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3000";
const OUT = "C:\\Users\\ASUS\\AppData\\Local\\Temp\\opencode\\shots";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["meetings", "/meetings"],
  ["summary", "/meetings/m-001"],
  ["live", "/meetings/new"],
  ["signin", "/sign-in"],
];

const WIDTHS = [
  ["mobile", 375],
  ["tablet", 768],
  ["desktop", 1280],
];

const only = process.argv[2];
const widths = only === "wide" ? WIDTHS.filter(([, w]) => w >= 1280) : WIDTHS;

const browser = await chromium.launch();
const context = await browser.newContext({
  reducedMotion: "reduce",
  deviceScaleFactor: 1,
});

for (const [name, path] of ROUTES) {
  for (const [label, width] of widths) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
    // let the dummy API delay settle and fonts finish
    await page.waitForTimeout(1600);
    const file = `${OUT}/${name}-${label}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log("saved", file);
    await page.close();
  }
}

await browser.close();