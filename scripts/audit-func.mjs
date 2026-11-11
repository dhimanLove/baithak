/**
 * Functional audit: drives the real UI and reports broken interactions,
 * console errors and hydration mismatches. Layout metrics live in
 * audit-layout.mjs; this file is about behaviour only.
 *
 *   node scripts/audit-func.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:3000";
const problems = [];
const notes = [];

function fail(msg) {
  problems.push(msg);
}

const browser = await chromium.launch();

async function newPage(width, height = 900) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      const text = message.text();
      if (/hydration|did not match|server rendered|unique "key"|validateDOMNesting/i.test(text)) {
        errors.push(text);
      }
    }
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  return { context, page, errors };
}

async function settle(page, ms = 1200) {
  await page.waitForTimeout(ms);
}

/* ---------------------------------------------------------------- routes */
const ROUTES = [
  "/",
  "/meetings",
  "/meetings?state=empty",
  "/meetings/m-001",
  "/meetings/new",
  "/sign-in",
  "/no-such-page",
];

for (const route of ROUTES) {
  const { context, page, errors } = await newPage(1280);
  const response = await page.goto(BASE + route, { waitUntil: "networkidle" });
  await settle(page, 1400);

  if (route !== "/no-such-page" && (!response || !response.ok())) {
    fail(`${route} responded ${response?.status()}`);
  }
  if (errors.length) fail(`${route} console: ${errors[0]}`);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 1) fail(`${route} horizontal overflow ${overflow}px at 1280`);

  const unknown = await page.locator("text=Unknown").count();
  if (unknown) fail(`${route} renders the literal "Unknown" speaker`);

  const h1 = await page.locator("h1").count();
  if (h1 !== 1) fail(`${route} has ${h1} <h1> elements`);

  // Every link must resolve to a real route (no dead hrefs).
  const hrefs = await page.$$eval("a[href]", (nodes) =>
    nodes.map((node) => node.getAttribute("href")),
  );
  const dead = hrefs.filter((href) => href === "#" || href === "");
  if (dead.length) fail(`${route} has ${dead.length} placeholder href="#"`);

  await context.close();
}

/* ---------------------------------------------------------- mobile nav */
{
  const { context, page, errors } = await newPage(390);
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await settle(page, 800);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  if (overflow > 1) fail(`/ horizontal overflow ${overflow}px at 390`);

  const toggle = page.locator('button[aria-controls="mobile-nav"]');
  if (!(await toggle.isVisible())) fail("mobile menu toggle is not visible at 390");

  await toggle.click();
  await settle(page, 400);
  const panel = page.locator("#mobile-nav");
  if (!(await panel.isVisible())) fail("mobile menu did not open");

  const expanded = await toggle.getAttribute("aria-expanded");
  if (expanded !== "true") fail(`mobile menu aria-expanded is ${expanded}`);

  const links = await panel.locator("a").count();
  if (links !== 4) fail(`mobile menu has ${links} links, expected 4`);

  await panel.getByRole("link", { name: "Meetings" }).click();
  await page.waitForURL("**/meetings");
  await settle(page, 900);
  if (await page.locator("#mobile-nav").isVisible()) fail("mobile menu stayed open after navigating");

  if (errors.length) fail(`mobile nav console: ${errors[0]}`);
  await context.close();
}

/* -------------------------------------------------------------- search */
{
  const { context, page } = await newPage(1280);
  await page.goto(BASE + "/meetings", { waitUntil: "networkidle" });
  await settle(page, 1400);

  const rows = () => page.locator("main ul > li").count();
  const initial = await rows();
  if (initial !== 6) fail(`/meetings lists ${initial} rows on load, expected 6`);

  const search = page.getByLabel("Search");
  await search.fill("northstar");
  await settle(page, 300);
  const filtered = await rows();
  if (filtered !== 1) fail(`search "northstar" returned ${filtered} rows, expected 1`);

  await search.fill("zzzzz");
  await settle(page, 300);
  if (!(await page.getByRole("button", { name: /clear search/i }).isVisible())) {
    fail("no-results state is missing its Clear search button");
  }
  await page.getByRole("button", { name: /clear search/i }).click();
  await settle(page, 300);
  const restored = await rows();
  if (restored !== 6) fail(`clearing search restored ${restored} rows, expected 6`);

  await context.close();
}

/* ------------------------------------------------------- action toggle */
{
  const { context, page } = await newPage(1280);
  await page.goto(BASE + "/meetings/m-001", { waitUntil: "networkidle" });
  await settle(page, 1600);

  const counter = page.locator("text=/\\d+ of 4 done/");
  const before = (await counter.first().textContent())?.trim();
  if (before !== "1 of 4 done") fail(`action counter starts at "${before}"`);

  await page.getByText("Finish the offline banner and its state machine").click();
  await settle(page, 400);
  const after = (await counter.first().textContent())?.trim();
  if (after !== "2 of 4 done") fail(`action counter after toggle is "${after}"`);

  const checked = await page
    .locator('input[type="checkbox"]:checked')
    .count();
  if (checked !== 2) fail(`${checked} checkboxes checked after toggle, expected 2`);

  await context.close();
}

/* ----------------------------------------------------------- copy + transcript */
{
  const { context, page } = await newPage(1280);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(BASE + "/meetings/m-001", { waitUntil: "networkidle" });
  await settle(page, 1600);

  await page.getByRole("button", { name: /copy summary/i }).click();
  await settle(page, 300);
  if (!(await page.getByRole("button", { name: /^copied$/i }).isVisible())) {
    fail("copy summary never reached the Copied state");
  }

  await page.getByText("Transcript", { exact: true }).click();
  await settle(page, 500);
  const scroller = page.locator(".scroll-smooth").first();
  if (!(await scroller.isVisible())) fail("transcript did not open");
  const box = await scroller.boundingBox();
  if (!box || box.height > 760) fail(`transcript panel is ${box?.height}px tall when open`);
  if (!box || box.height < 200) fail(`transcript panel is ${box?.height}px tall when open`);

  await context.close();
}

/* ------------------------------------------------------------ live flow */
{
  const { context, page, errors } = await newPage(1280);
  await page.goto(BASE + "/meetings/new", { waitUntil: "networkidle" });
  await settle(page, 800);

  await page.getByRole("button", { name: /start recording/i }).click();
  await settle(page, 500);
  if (!(await page.getByText("Listening").isVisible())) fail("live screen never showed Listening");

  await settle(page, 3600);
  const lines = await page.locator("ul[aria-live] > li").count();
  if (lines < 2) fail(`live transcript rendered ${lines} lines after 4s`);

  await page.getByRole("button", { name: /end meeting/i }).click();
  await settle(page, 500);
  if (!(await page.getByText("Writing your summary").isVisible())) {
    fail("processing state never appeared");
  }

  await settle(page, 2600);
  if (!(await page.getByText("Summary is ready").isVisible())) fail("done state never appeared");
  if (!(await page.getByRole("link", { name: /read the summary/i }).isVisible())) {
    fail("done state is missing its summary link");
  }

  if (errors.length) fail(`live flow console: ${errors[0]}`);
  await context.close();
}

/* ------------------------------------------------------------- sign in */
{
  const { context, page } = await newPage(1280);
  await page.goto(BASE + "/sign-in", { waitUntil: "networkidle" });
  await settle(page, 600);

  await page.getByLabel("Work email").fill("priya@baithak.app");
  await page.getByLabel("Password").fill("correct horse battery staple");
  const before = page.url();
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await settle(page, 700);

  if (page.url() !== before) fail("sign in navigated away from the page");
  if (!(await page.getByRole("status").isVisible())) fail("sign in gave no feedback after submit");

  const stillFilled = await page.getByLabel("Work email").inputValue();
  if (stillFilled !== "priya@baithak.app") fail("sign in cleared the email field on submit");

  await context.close();
}

/* --------------------------------------------------------------- 404 */
{
  const { context, page } = await newPage(1280);
  const response = await page.goto(BASE + "/no-such-page", { waitUntil: "networkidle" });
  if (response.status() !== 404) fail(`unknown route returned ${response.status()}`);
  await context.close();
}

await browser.close();

if (problems.length) {
  console.log("FUNCTIONAL AUDIT FAILED");
  for (const problem of problems) console.log("  FAIL " + problem);
  process.exit(1);
}

console.log(`functional audit passed (${ROUTES.length} routes + 6 interaction flows)`);
for (const note of notes) console.log("  note " + note);
