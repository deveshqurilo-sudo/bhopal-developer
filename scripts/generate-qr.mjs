// Generates the print/share QR assets in public/qr. Run: npm run qr
import { mkdir, writeFile } from "node:fs/promises";
import QRCode from "qrcode";
import sharp from "sharp";

const WEBSITE_URL = "https://landmarkbuildersanddevelopers.nextdeal.in/";
const COMPANY = "LANDMARK BUILDERS & DEVELOPERS";
const OUT_DIR = new URL("../public/qr/", import.meta.url);

const INK = "#1d2733";
const BLUE = "#0055f1";
const MUTED = "#596779";
const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, Times New Roman, serif";

// High error correction keeps the code scannable with the center badge.
const qr = QRCode.create(WEBSITE_URL, { errorCorrectionLevel: "H" });
const count = qr.modules.size;
const isDark = (r, c) => qr.modules.get(r, c) === 1;
const inFinder = (r, c) =>
  (r < 7 && c < 7) || (r < 7 && c >= count - 7) || (r >= count - 7 && c < 7);

/** QR modules as SVG, drawn at (x, y) with the given total size. */
function qrMarkup(x, y, size) {
  const m = size / count;
  const parts = [];

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (!isDark(r, c) || inFinder(r, c)) continue;
      // Near-full rounded squares: soft look without losing scan contrast.
      const s = m * 0.9;
      const mx = x + c * m + (m - s) / 2;
      const my = y + r * m + (m - s) / 2;
      parts.push(`<rect x="${mx.toFixed(2)}" y="${my.toFixed(2)}" width="${s.toFixed(2)}" height="${s.toFixed(2)}" rx="${(m * 0.3).toFixed(2)}"/>`);
    }
  }

  const eyes = [
    [0, 0],
    [0, count - 7],
    [count - 7, 0],
  ].map(([r, c]) => {
    const ex = x + c * m;
    const ey = y + r * m;
    return `
      <rect x="${ex + m / 2}" y="${ey + m / 2}" width="${m * 6}" height="${m * 6}" rx="${m * 1.8}" fill="none" stroke="${BLUE}" stroke-width="${m}"/>
      <rect x="${ex + m * 2}" y="${ey + m * 2}" width="${m * 3}" height="${m * 3}" rx="${m * 0.9}" fill="${INK}"/>`;
  });

  // Center badge: a wide NextDeal pill, well under the ~30% damage budget of level H.
  const bw = m * 13;
  const bh = m * 4.6;
  const bx = x + size / 2 - bw / 2;
  const by = y + size / 2 - bh / 2;
  const center = `
    <rect x="${bx - m * 0.6}" y="${by - m * 0.6}" width="${bw + m * 1.2}" height="${bh + m * 1.2}" rx="${m * 1.6}" fill="#fff"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${m * 1.2}" fill="${INK}"/>
    <text x="${bx + bw / 2}" y="${by + bh / 2 + m * 0.95}" text-anchor="middle" font-family="${SANS}" font-size="${m * 2.7}" font-weight="700" fill="#fff">Next<tspan fill="#5b95ff">Deal</tspan></text>`;

  return `<g fill="${INK}">${parts.join("")}</g>${eyes.join("")}${center}`;
}

function qrOnlySvg(size = 1024) {
  // 4-module quiet zone, as the QR spec recommends.
  const pad = (size * 4) / (count + 8);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#fff"/>
  ${qrMarkup(pad, pad, size - pad * 2)}
</svg>`;
}

function cardSvg() {
  const W = 1200;
  const H = 1650;
  const qrSize = 760;
  const qrX = (W - qrSize) / 2;
  const qrY = 440;
  const footerY = H - 250;
  const host = new URL(WEBSITE_URL).host;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#f2f7ff"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="56" fill="#fff" stroke="#e1e8f2" stroke-width="3"/>

  <text x="${W / 2}" y="170" text-anchor="middle" font-family="${SANS}" font-size="30" font-weight="700" letter-spacing="7" fill="${BLUE}">${COMPANY.replace("&", "&amp;")}</text>
  <text x="${W / 2}" y="270" text-anchor="middle" font-family="${SERIF}" font-size="76" fill="${INK}">Scan to explore our projects</text>
  <text x="${W / 2}" y="330" text-anchor="middle" font-family="${SANS}" font-size="30" fill="${MUTED}">Premium plots &amp; farmhouses in Bhopal</text>

  <rect x="${qrX - 60}" y="${qrY - 60}" width="${qrSize + 120}" height="${qrSize + 120}" rx="44" fill="#fff" stroke="#e1e8f2" stroke-width="3"/>
  ${qrMarkup(qrX, qrY, qrSize)}

  <text x="${W / 2}" y="${qrY + qrSize + 150}" text-anchor="middle" font-family="${SANS}" font-size="34" font-weight="600" fill="${INK}">${host}</text>

  <path d="M40 ${footerY} H${W - 40} V${H - 96} a56 56 0 0 1 -56 56 H96 a56 56 0 0 1 -56 -56 Z" fill="${INK}"/>
  <text x="${W / 2}" y="${footerY + 82}" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="5" fill="#b8c4d4">WEBSITE DESIGNED &amp; DEVELOPED BY</text>
  <text x="${W / 2}" y="${footerY + 160}" text-anchor="middle" font-family="${SANS}" font-size="64" font-weight="700" fill="#fff">Next<tspan fill="#5b95ff">Deal</tspan><tspan dx="28" font-size="40" font-weight="500" fill="#b8c4d4">·</tspan><tspan dx="20" font-size="40" font-weight="500" fill="#b8c4d4">nextdeal.in</tspan></text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

const files = {
  "website-qr.svg": qrOnlySvg(),
  "website-qr-card.svg": cardSvg(),
};

for (const [name, svg] of Object.entries(files)) {
  await writeFile(new URL(name, OUT_DIR), svg);
  // 2x density for sharp prints and WhatsApp sharing.
  await sharp(Buffer.from(svg), { density: 144 })
    .png()
    .toFile(new URL(name.replace(".svg", ".png"), OUT_DIR).pathname);
}

console.log(`QR assets for ${WEBSITE_URL} written to public/qr/`);
