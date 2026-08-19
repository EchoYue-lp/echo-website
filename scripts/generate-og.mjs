import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const icon = await readFile(path.join(root, 'public', 'eko-icon.png'));
const iconUrl = `data:image/png;base64,${icon.toString('base64')}`;
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html>
    <html><head><style>
      * { box-sizing: border-box; }
      html, body { width: 1200px; height: 630px; margin: 0; overflow: hidden; }
      body { background: #0b0d0c; color: #f4f4f5; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .canvas { position: relative; height: 100%; padding: 72px 82px; border: 1px solid #29302b; }
      .line { position: absolute; top: 0; bottom: 0; width: 1px; background: #1d231f; }
      .line.one { left: 82px; } .line.two { left: 600px; } .line.three { right: 82px; }
      .brand { position: relative; display: flex; align-items: center; gap: 20px; font-size: 22px; color: #a1a1aa; }
      .mark { width: 58px; height: 58px; display: grid; place-items: center; border: 1px solid #6ee7b7; border-radius: 7px; color: #a7f3d0; font: 700 28px ui-monospace, monospace; background: #12251d; }
      .eko-icon { width: 58px; height: 58px; border-radius: 7px; }
      .products { position: relative; display: flex; align-items: center; gap: 22px; margin-top: 76px; }
      h1 { margin: 0; font-size: 76px; line-height: .95; letter-spacing: 0; font-weight: 680; }
      .plus { color: #fcd34d; font: 500 54px ui-monospace, monospace; }
      .rule { position: relative; width: 100%; height: 1px; margin-top: 58px; background: #303832; }
      .rule::before { content: ""; display: block; width: 34%; height: 3px; background: #6ee7b7; transform: translateY(-1px); }
      .copy { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 50px; margin-top: 30px; }
      .copy p { margin: 0; font-size: 22px; line-height: 1.42; color: #d4d4d8; }
      .copy strong { display: block; margin-bottom: 7px; color: #6ee7b7; font: 700 14px ui-monospace, monospace; text-transform: uppercase; }
      .copy .eko strong { color: #fcd34d; }
      .url { position: absolute; right: 82px; bottom: 42px; color: #67e8f9; font: 500 15px ui-monospace, monospace; }
    </style></head><body><main class="canvas">
      <span class="line one"></span><span class="line two"></span><span class="line three"></span>
      <div class="brand"><span class="mark">{ }</span><span>Rust agent framework and local personal AI assistant</span></div>
      <div class="products"><h1>echo-agent</h1><span class="plus">+</span><img class="eko-icon" src="${iconUrl}" alt=""><h1>EKO</h1></div>
      <div class="rule"></div>
      <div class="copy">
        <p><strong>Framework</strong>Easy to start. Powerful by composition. Typed, modular, and documented in English and Chinese.</p>
        <p class="eko"><strong>Application</strong>Coding, data analysis, literature research, and inspectable long-horizon work on your machine.</p>
      </div>
      <span class="url">echo-agent.dev</span>
    </main></body></html>`);
  await page.screenshot({ path: path.join(root, 'public', 'og-image.png'), type: 'png' });
} finally {
  await browser.close();
}
