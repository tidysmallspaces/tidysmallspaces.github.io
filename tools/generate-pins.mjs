import fs from "node:fs/promises";
import path from "node:path";

const outputDir = "assets/pins/week-01";
await fs.mkdir(outputDir, { recursive: true });

const pins = [
  ["PIN-001", "numbered", ["7 No-Drill", "Storage Ideas", "for a Tiny Apartment"], ["Use the back of a door", "Look under the bed", "Use your wall height"], "Small Apartment Organization"],
  ["PIN-002", "mistake", ["The Tiny Entryway", "Mistake That Creates", "a Daily Pile"], ["No landing zone for daily items", "Give keys, bags and mail a home"], "Tiny Entryway Organization"],
  ["PIN-003", "checklist", ["Measure These 4 Things", "Before Buying", "Under-Bed Storage"], ["Usable height", "Width and depth", "Room to pull it out", "What belongs inside"], "Under-Bed Storage Ideas"],
  ["PIN-004", "numbered", ["5 Renter-Friendly", "Ways to Use", "Wall Height"], ["Try removable hooks", "Store occasional items high", "Keep heavy items lower"], "Renter-Friendly Storage Ideas"],
  ["PIN-005", "checklist", ["A 20-Minute Reset", "for a Cluttered", "Apartment Entrance"], ["Choose one small tray", "Hang everyday bags", "Limit shoes at the door", "Add a mail basket"], "Tiny Entryway Organization"],
  ["PIN-006", "mistake", ["Why Your Under-Bed", "Organizers Never", "Quite Fit"], ["Buying bins before measuring", "Check height, depth and pull-out room"], "Under-Bed Storage Ideas"],
  ["PIN-007", "mistake", ["Stop Buying", "Storage Bins Before", "You Check These Spots"], ["Adding containers without a job", "Look behind doors and under furniture"], "Small Apartment Organization"],
  ["PIN-008", "numbered", ["5 Things Every", "Small Entryway", "Needs a Home For"], ["Keys and small items", "Shoes in your rotation", "Bags, mail and weather gear"], "Tiny Entryway Organization"],
  ["PIN-009", "checklist", ["A Safer Vertical", "Storage Plan for", "a Small Home"], ["Keep heavy items low", "Check weight limits", "Group similar items", "Use high shelves occasionally"], "Vertical Storage for Small Spaces"],
  ["PIN-010", "numbered", ["7 Empty Spaces", "Renters Forget", "to Use"], ["Behind doors", "Under furniture", "Above eye level"], "Renter-Friendly Storage Ideas"],
];

const esc = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const lines = (items, x, y, size, step, style = "") =>
  items.map((item, index) =>
    `<text x="${x}" y="${y + index * step}" ${style} font-size="${size}">${esc(item)}</text>`,
  ).join("\n");

const brand = `
  <text x="88" y="128" fill="#476655" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="5">TIDY SMALL SPACES</text>
  <text x="88" y="1410" fill="#617067" font-family="Arial, sans-serif" font-size="25">tidysmallspaces.github.io</text>`;

function numbered([id, , headline, items, board]) {
  const itemRows = items.map((item, index) => {
    const y = 715 + index * 170;
    return `
      <circle cx="150" cy="${y - 20}" r="48" fill="#DCE6D8"/>
      <text x="135" y="${y}" fill="#476655" font-family="Georgia, serif" font-size="58">${index + 1}</text>
      <text x="235" y="${y - 4}" fill="#243229" font-family="Arial, sans-serif" font-size="39" font-weight="700">${esc(item)}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
    <rect width="1000" height="1500" fill="#F7F4ED"/>
    <rect x="54" y="54" width="892" height="1392" rx="12" fill="#FFFDF9" stroke="#D8DED5" stroke-width="4"/>
    ${brand}
    ${lines(headline, 88, 272, 78, 88, 'fill="#243229" font-family="Georgia, serif"')}
    <text x="88" y="575" fill="#617067" font-family="Arial, sans-serif" font-size="31">${esc(board)}</text>
    <line x1="88" y1="625" x2="912" y2="625" stroke="#D8DED5" stroke-width="4"/>
    ${itemRows}
    <rect x="88" y="1260" width="824" height="86" rx="8" fill="#243229"/>
    <text x="140" y="1316" fill="#FFFDF9" font-family="Arial, sans-serif" font-size="34" font-weight="700">Save the full guide for later</text>
  </svg>`;
}

function mistake([id, , headline, items, board]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
    <rect width="1000" height="1500" fill="#DCE6D8"/>
    ${brand}
    ${lines(headline, 88, 280, 76, 88, 'fill="#243229" font-family="Georgia, serif"')}
    <text x="88" y="583" fill="#617067" font-family="Arial, sans-serif" font-size="31">${esc(board)}</text>
    <rect x="88" y="650" width="824" height="245" rx="10" fill="#FFFDF9"/>
    <text x="134" y="720" fill="#C0785D" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="3">THE MISTAKE</text>
    ${lines([items[0]], 134, 805, 35, 50, 'fill="#243229" font-family="Arial, sans-serif" font-weight="700"')}
    <rect x="88" y="935" width="824" height="245" rx="10" fill="#476655"/>
    <text x="134" y="1005" fill="#DCE6D8" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="3">THE FIX</text>
    ${lines([items[1]], 134, 1090, 35, 50, 'fill="#FFFDF9" font-family="Arial, sans-serif" font-weight="700"')}
    <text x="88" y="1300" fill="#243229" font-family="Arial, sans-serif" font-size="34" font-weight="700">Save this before your next reset</text>
  </svg>`;
}

function checklist([id, , headline, items, board]) {
  const itemRows = items.map((item, index) => {
    const y = 724 + index * 123;
    return `
      <rect x="112" y="${y - 45}" width="54" height="54" rx="6" fill="#DCE6D8" stroke="#476655" stroke-width="3"/>
      <path d="M126 ${y - 18}l12 12 20-27" fill="none" stroke="#476655" stroke-linecap="round" stroke-linejoin="round" stroke-width="7"/>
      <text x="208" y="${y - 3}" fill="#243229" font-family="Arial, sans-serif" font-size="37" font-weight="700">${esc(item)}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
    <rect width="1000" height="1500" fill="#F7F4ED"/>
    <rect x="54" y="54" width="892" height="1392" rx="12" fill="#FFFDF9" stroke="#D8DED5" stroke-width="4"/>
    ${brand}
    ${lines(headline, 88, 280, 74, 86, 'fill="#243229" font-family="Georgia, serif"')}
    <text x="88" y="576" fill="#617067" font-family="Arial, sans-serif" font-size="31">${esc(board)}</text>
    <line x1="88" y1="625" x2="912" y2="625" stroke="#D8DED5" stroke-width="4"/>
    ${itemRows}
    <rect x="88" y="1260" width="824" height="86" rx="8" fill="#243229"/>
    <text x="140" y="1316" fill="#FFFDF9" font-family="Arial, sans-serif" font-size="34" font-weight="700">Save the full checklist</text>
  </svg>`;
}

for (const pin of pins) {
  const svg = pin[1] === "numbered" ? numbered(pin) : pin[1] === "mistake" ? mistake(pin) : checklist(pin);
  const svgPath = path.join(outputDir, `${pin[0]}.svg`);
  await fs.writeFile(svgPath, svg);
}

console.log(`Generated ${pins.length} editable SVG Pin designs in ${outputDir}.`);
