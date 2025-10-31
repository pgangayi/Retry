const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const logs = [];
  let browser;
  try {
    browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    page.on('console', async msg => {
      try {
        const args = [];
        for (const a of msg.args()) {
          try { args.push(await a.jsonValue()); } catch(e) { args.push(String(a)); }
        }
        logs.push({type: 'console.' + msg.type(), text: msg.text(), args, location: msg.location()});
      } catch (e) { logs.push({type: 'console', text: String(msg)}); }
    });

  page.on('pageerror', err => logs.push({type: 'pageerror', message: err.message, stack: err.stack}));

    page.on('requestfailed', req => logs.push({type: 'requestfailed', url: req.url(), failure: req.failure()?.errorText}));

    page.on('response', response => {
      try {
        const status = response.status();
        if (status >= 400) logs.push({type: 'response', url: response.url(), status});
      } catch (e) { /* ignore */ }
    });

    const url = 'https://e2a31fb2.farmers-boot.pages.dev/';
    try {
      await page.goto(url, {waitUntil: 'networkidle2', timeout: 30000});
  // wait a bit for runtime logs
  await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
      logs.push({type: 'navigation error', text: e.toString()});
    }

  // capture screenshot (write to current working directory)
  const screenshotPath = 'console_screenshot.png';
  await page.screenshot({path: screenshotPath, fullPage: true});

  // write logs (to current working directory)
  const outPath = 'console_logs.json';
    fs.writeFileSync(outPath, JSON.stringify(logs, null, 2));
    console.log('Saved', outPath, 'and', screenshotPath);
  } catch (err) {
    console.error('Script error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
