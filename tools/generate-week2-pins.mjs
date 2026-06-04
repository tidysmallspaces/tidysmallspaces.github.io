import fs from "node:fs/promises";
import path from "node:path";

const outDir = "assets/pins/week-02";
await fs.mkdir(outDir, { recursive: true });

const pins = [
  ["W2-PIN-001", ["7 No-Drill", "Storage Ideas", "for Tiny Apartments"], "Door + wall + under-bed zones", ["Back of door", "Under bed", "Wall height"], "no-drill"],
  ["W2-PIN-002", ["3 Hidden", "Storage Spots", "Renters Forget"], "A room map with overlooked zones", ["Behind doors", "Under furniture", "Above eye level"], "diagram"],
  ["W2-PIN-003", ["Use the Back", "of a Door", "Without Drilling"], "Over-door storage idea", ["Light items", "Easy reach", "No holes"], "door"],
  ["W2-PIN-004", ["Before You Buy", "Another Storage Bin", "Measure This"], "Measure-first under-bed storage", ["Height", "Depth", "Pull-out room"], "measure"],
  ["W2-PIN-005", ["Small Apartment", "Storage That Does", "Not Need Holes"], "Renter-friendly vertical storage", ["Hooks", "Door storage", "Stacking"], "no-drill"],
  ["W2-PIN-006", ["The 20-Minute", "Entryway", "Reset"], "Quick entryway routine", ["Clear extras", "Limit shoes", "Add one tray"], "entry"],
  ["W2-PIN-007", ["Give Keys", "Bags and Mail", "One Home"], "Entryway categories", ["Keys", "Bags", "Mail"], "entry"],
  ["W2-PIN-008", ["Under-Bed Storage", "Measure These", "4 Things"], "Under-bed checklist", ["Height", "Width", "Depth", "Access"], "measure"],
  ["W2-PIN-009", ["Why Under-Bed", "Bins Never", "Fit"], "Common storage mistake", ["Lowest point", "Handles", "Pull-out path"], "measure"],
  ["W2-PIN-010", ["A Safer Way", "to Use", "Wall Height"], "Vertical storage safety", ["Heavy low", "Daily middle", "Light high"], "vertical"],
  ["W2-PIN-011", ["Keep Heavy Items", "Low Store Light", "Items High"], "Safe shelf plan", ["Weight limit", "Reach", "Labels"], "vertical"],
  ["W2-PIN-012", ["One Clear Surface", "Can Calm", "a Small Room"], "Decluttering starting point", ["Clear", "Sort", "Return"], "diagram"],
  ["W2-PIN-013", ["Stop the Daily", "Pile at", "the Door"], "Entryway pile fix", ["Keys", "Shoes", "Mail"], "entry"],
  ["W2-PIN-014", ["Empty Spaces", "You Can Use", "This Weekend"], "Unused spaces checklist", ["Cabinet doors", "Closet floor", "Narrow gaps"], "diagram"],
];

const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function textLines(lines, x, y, size, step, attrs = "") {
  return lines.map((line, i) => `<text x="${x}" y="${y + i * step}" ${attrs} font-size="${size}">${esc(line)}</text>`).join("\n");
}

function icon(type) {
  if (type === "entry") {
    return `<rect x="650" y="670" width="220" height="290" rx="12" fill="#DCE6D8"/><rect x="690" y="730" width="140" height="42" rx="10" fill="#FFFDF9"/><rect x="690" y="810" width="140" height="42" rx="10" fill="#FFFDF9"/><circle cx="735" cy="895" r="18" fill="#D7A276"/><rect x="682" y="890" width="128" height="38" rx="8" fill="#476655"/>`;
  }
  if (type === "measure") {
    return `<rect x="625" y="700" width="260" height="180" rx="14" fill="#DCE6D8"/><path d="M650 925h250" stroke="#476655" stroke-width="12" stroke-linecap="round"/><path d="M650 925l28-28M650 925l28 28M900 925l-28-28M900 925l-28 28" stroke="#476655" stroke-width="8" stroke-linecap="round"/><text x="690" y="805" fill="#243229" font-family="Arial" font-size="36" font-weight="700">measure</text>`;
  }
  if (type === "door") {
    return `<rect x="650" y="610" width="210" height="420" rx="8" fill="#FFFDF9" stroke="#D8DED5" stroke-width="5"/><rect x="690" y="675" width="130" height="250" rx="12" fill="#DCE6D8" stroke="#476655" stroke-width="5"/><line x1="690" y1="760" x2="820" y2="760" stroke="#476655" stroke-width="5"/><line x1="690" y1="845" x2="820" y2="845" stroke="#476655" stroke-width="5"/>`;
  }
  if (type === "vertical") {
    return `<rect x="630" y="650" width="250" height="44" rx="8" fill="#476655"/><rect x="630" y="790" width="250" height="44" rx="8" fill="#476655"/><rect x="630" y="930" width="250" height="44" rx="8" fill="#476655"/><circle cx="700" cy="615" r="38" fill="#DCE6D8"/><rect x="705" y="720" width="90" height="70" rx="10" fill="#DCE6D8"/><rect x="660" y="870" width="170" height="75" rx="10" fill="#D7A276"/>`;
  }
  return `<rect x="620" y="640" width="290" height="300" rx="16" fill="#DCE6D8"/><path d="M650 840h250M650 740h250M735 640v300" stroke="#FFFDF9" stroke-width="12"/><circle cx="705" cy="710" r="18" fill="#476655"/><circle cx="820" cy="815" r="18" fill="#D7A276"/>`;
}

function makeSvg([id, headline, sub, bullets, type]) {
  const bulletRows = bullets.map((b, i) => {
    const y = 850 + i * 92;
    return `<circle cx="112" cy="${y - 13}" r="24" fill="#DCE6D8"/><text x="102" y="${y}" fill="#476655" font-family="Georgia" font-size="35">${i + 1}</text><text x="158" y="${y}" fill="#243229" font-family="Arial" font-size="31" font-weight="700">${esc(b)}</text>`;
  }).join("\n");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1500" viewBox="0 0 1000 1500">
  <rect width="1000" height="1500" fill="#F7F4ED"/>
  <rect x="54" y="54" width="892" height="1392" rx="12" fill="#FFFDF9" stroke="#D8DED5" stroke-width="4"/>
  <text x="88" y="128" fill="#476655" font-family="Arial" font-size="27" font-weight="700" letter-spacing="5">TIDY SMALL SPACES</text>
  ${textLines(headline, 88, 275, 73, 84, 'fill="#243229" font-family="Georgia"')}
  <text x="88" y="590" fill="#617067" font-family="Arial" font-size="31">${esc(sub)}</text>
  <line x1="88" y1="640" x2="912" y2="640" stroke="#D8DED5" stroke-width="4"/>
  ${icon(type)}
  ${bulletRows}
  <rect x="88" y="1248" width="824" height="88" rx="8" fill="#243229"/>
  <text x="140" y="1305" fill="#FFFDF9" font-family="Arial" font-size="34" font-weight="700">${type === "measure" ? "Read the full checklist" : "Get the full guide"}</text>
  <text x="88" y="1408" fill="#617067" font-family="Arial" font-size="25">tidysmallspaces.github.io</text>
</svg>`;
}

for (const pin of pins) {
  await fs.writeFile(path.join(outDir, `${pin[0]}.svg`), makeSvg(pin));
}

console.log(`Generated ${pins.length} week-two SVG files in ${outDir}.`);
