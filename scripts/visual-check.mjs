import { chromium } from "playwright-core";

const executablePath =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

async function capture(name, viewport, target) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  if (target) {
    await page.locator(target).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: name, fullPage: false });
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  process.stdout.write(`${name} ${JSON.stringify(dimensions)}\n`);
  await page.close();
}

await capture("qa-desktop-top.png", { width: 1440, height: 900 });
await capture(
  "qa-desktop-console.png",
  { width: 1440, height: 1000 },
  "#console",
);
await capture("qa-mobile-top.png", { width: 390, height: 844 });
await capture(
  "qa-mobile-console.png",
  { width: 390, height: 844 },
  "#console",
);

await browser.close();
