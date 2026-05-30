import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const wb = Workbook.create();
const dashboard = wb.worksheets.add("Dashboard");
const pins = wb.worksheets.add("Pins");
const products = wb.worksheets.add("Products");
const setup = wb.worksheets.add("Setup");
const ideas = wb.worksheets.add("Content Ideas");
const c = { ink: "#243229", leaf: "#476655", sage: "#DCE6D8" };

function header(sheet, range) {
  sheet.getRange(range).format = {
    fill: c.ink,
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
}

for (const sheet of [dashboard, pins, products, setup, ideas]) {
  sheet.showGridLines = false;
}

dashboard.getRange("A1:H1").merge();
dashboard.getRange("A1").values = [["Tidy Small Spaces - 30-Day Launch Dashboard"]];
dashboard.getRange("A1:H1").format = {
  fill: c.ink,
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
dashboard.getRange("A3:B8").values = [
  ["Metric", "Current"],
  ["Pins planned", "=COUNTA(Pins!A2:A61)"],
  ["Pins published", '=COUNTIF(Pins!G2:G61,"Published")'],
  ["Outbound clicks", "=SUM(Pins!L2:L61)"],
  ["Amazon clicks", "=SUM(Pins!N2:N61)"],
  ["Qualifying orders", "=SUM(Pins!O2:O61)"],
];
dashboard.getRange("D3:E8").values = [
  ["Goal", "Target"],
  ["Month-one pins", 60],
  ["Daily cadence", 2],
  ["First review", "After 14 days"],
  ["Spend before $30 earned", "$0"],
  ["Commission earned", "=SUM(Pins!P2:P61)"],
];
dashboard.getRange("A10:H10").merge();
dashboard.getRange("A10").values = [[
  "Weekly review: keep the best-performing topic, headline style, and guide. Replace weak variants with a clearer promise or more useful visual.",
]];
dashboard.getRange("A10:H10").format = { fill: c.sage, wrapText: true };
dashboard.getRange("A12:C17").values = [
  ["Week", "Outbound clicks", "Orders"],
  ["Week 1", "=SUM(Pins!L2:L15)", "=SUM(Pins!O2:O15)"],
  ["Week 2", "=SUM(Pins!L16:L29)", "=SUM(Pins!O16:O29)"],
  ["Week 3", "=SUM(Pins!L30:L43)", "=SUM(Pins!O30:O43)"],
  ["Week 4", "=SUM(Pins!L44:L57)", "=SUM(Pins!O44:O57)"],
  ["Days 29-30", "=SUM(Pins!L58:L61)", "=SUM(Pins!O58:O61)"],
];
for (const range of ["A3:B3", "D3:E3", "A12:C12"]) header(dashboard, range);
const chart = dashboard.charts.add("bar", dashboard.getRange("A12:C17"));
chart.title = "Clicks and orders by week";
chart.hasLegend = true;
chart.setPosition("E12", "L28");
dashboard.getRange("E8").format.numberFormat = "$#,##0.00";
["A:A", "D:D"].forEach((range) => dashboard.getRange(range).format.columnWidth = 22);
["B:B", "E:E"].forEach((range) => dashboard.getRange(range).format.columnWidth = 18);

const pinHeaders = [
  "Pin ID", "Publish Date", "Guide", "Template", "Headline / Angle",
  "Target Keyword", "Status", "Pinterest URL", "Destination URL",
  "Impressions", "Saves", "Outbound Clicks", "Website Visits",
  "Amazon Clicks", "Orders", "Commission", "Notes",
];
pins.getRange("A1:Q1").values = [pinHeaders];
header(pins, "A1:Q1");
const guides = ["No-drill storage", "Tiny entryway", "Storage checklist"];
const templates = ["Numbered tips", "Mistake and fix", "Checklist"];
const headlines = [
  "7 no-drill storage ideas for a tiny apartment",
  "Small entryway fixes that stop the daily pile",
  "Measure this before buying under-bed storage",
  "The overlooked spaces renters can organize today",
  "5 ways to use vertical space in a small home",
  "A simple reset for a cluttered apartment entrance",
  "Under-bed storage mistakes that waste space",
  "Small-space storage ideas that do not need a renovation",
  "A calmer corner in 20 minutes",
  "Before you buy another storage bin, do this",
];
const keywords = [
  "small apartment organization", "small entryway organization",
  "under bed storage ideas", "renter friendly storage",
  "vertical storage ideas", "small space organization",
];
const pinRows = [];
const start = new Date("2026-06-01T00:00:00");
for (let i = 0; i < 60; i += 1) {
  const date = new Date(start);
  date.setDate(date.getDate() + Math.floor(i / 2));
  pinRows.push([
    `PIN-${String(i + 1).padStart(3, "0")}`, date, guides[i % 3],
    templates[i % 3], headlines[i % 10], keywords[i % 6], "Planned",
    "", "", 0, 0, 0, 0, 0, 0, 0, "",
  ]);
}
pins.getRange("A2:Q61").values = pinRows;
pins.getRange("B2:B61").format.numberFormat = "yyyy-mm-dd";
pins.getRange("P2:P61").format.numberFormat = "$#,##0.00";
pins.getRange("G2:G61").dataValidation = {
  rule: { type: "list", values: ["Planned", "Designed", "Scheduled", "Published", "Refresh"] },
};
pins.freezePanes.freezeRows(1);
pins.tables.add("A1:Q61", true, "PinsTable");
[12, 14, 20, 18, 52, 28, 14, 34, 38, 13, 10, 16, 15, 14, 10, 14, 34]
  .forEach((width, i) => pins.getRangeByIndexes(0, i, 61, 1).format.columnWidth = width);

products.getRange("A1:K1").values = [[
  "Product ID", "Problem Solved", "Product Name", "Amazon URL", "Guide",
  "Measurements Checked?", "Weight Limit Checked?", "Reviews Checked?",
  "Return Terms Checked?", "Affiliate Link Added?", "Notes",
]];
header(products, "A1:K1");
const productRows = [];
for (let i = 1; i <= 24; i += 1) {
  productRows.push([`PROD-${String(i).padStart(3, "0")}`, "", "", "", "", "No", "No", "No", "No", "No", ""]);
}
products.getRange("A2:K25").values = productRows;
for (const col of ["F", "G", "H", "I", "J"]) {
  products.getRange(`${col}2:${col}25`).dataValidation = {
    rule: { type: "list", values: ["No", "Yes", "N/A"] },
  };
}
products.freezePanes.freezeRows(1);
products.tables.add("A1:K25", true, "ProductsTable");
[12, 26, 34, 44, 20, 20, 20, 18, 22, 20, 34]
  .forEach((width, i) => products.getRangeByIndexes(0, i, 25, 1).format.columnWidth = width);

setup.getRange("A1:D1").values = [["Step", "Owner", "Status", "Notes"]];
header(setup, "A1:D1");
setup.getRange("A2:D13").values = [
  ["Choose final brand name", "Together", "In progress", "Working name: Tidy Small Spaces"],
  ["Create Canva Free account", "You", "Not started", "No paid plan needed"],
  ["Confirm Pinterest business account and rename profile", "You", "In progress", "Current profile: pinterest.com/davidforexe/"],
  ["Make GitHub repository public", "You", "In progress", "Repository pushed; switch visibility to Public for GitHub Pages Free"],
  ["Publish GitHub Pages site", "You + Codex", "Blocked", "Enable Pages from main / (root) after repository is public"],
  ["Add Pinterest profile link to site", "Codex", "Done", "Temporary davidforexe URL added; update after rename"],
  ["Apply to Amazon.com Associates", "You", "Blocked", "Do after website is public"],
  ["Register website and Pinterest profile in Associates", "You", "Blocked", "Needs both public URLs"],
  ["Add Associates tag links to guides", "Together", "Blocked", "Only create links inside Associates"],
  ["Create first weekly Pin batch", "Together", "Not started", "14 original Pins"],
  ["Schedule first 10 Pins in Pinterest", "You", "Blocked", "Needs Pinterest profile and designs"],
  ["Review analytics after 14 days", "Together", "Blocked", "Use dashboard metrics"],
];
setup.getRange("C2:C13").dataValidation = {
  rule: { type: "list", values: ["Not started", "In progress", "Blocked", "Done"] },
};
setup.freezePanes.freezeRows(1);
setup.tables.add("A1:D13", true, "SetupTable");
[36, 16, 16, 60].forEach((width, i) => setup.getRangeByIndexes(0, i, 13, 1).format.columnWidth = width);

ideas.getRange("A1:F1").values = [[
  "Content Cluster", "Pin Concept", "Best Template", "Guide Destination", "Visual Direction", "Status",
]];
header(ideas, "A1:F1");
ideas.getRange("A2:F13").values = [
  ["No-drill storage", "7 empty spaces renters forget to use", "Numbered tips", "No-drill storage", "Simple room outline with highlighted zones", "Ready"],
  ["No-drill storage", "Stop buying bins before you check these 3 spots", "Mistake and fix", "No-drill storage", "Three clean icon panels", "Ready"],
  ["No-drill storage", "5 renter-friendly ways to use wall height", "Numbered tips", "No-drill storage", "Vertical shelf crop with labels", "Ready"],
  ["Tiny entryway", "A 20-minute reset for your apartment entrance", "Checklist", "Tiny entryway", "Entryway checklist on warm neutral background", "Ready"],
  ["Tiny entryway", "The tiny-entryway mistake that creates a daily pile", "Mistake and fix", "Tiny entryway", "Before-and-after landing zone", "Ready"],
  ["Tiny entryway", "5 things every small entryway needs a home for", "Numbered tips", "Tiny entryway", "Keys, bag, shoes, mail, umbrella flat lay", "Ready"],
  ["Storage checklist", "Measure these 4 things before buying under-bed bins", "Checklist", "Storage checklist", "Tape measure and bed-frame diagram", "Ready"],
  ["Storage checklist", "Why your under-bed organizers never quite fit", "Mistake and fix", "Storage checklist", "Clean measurement callouts", "Ready"],
  ["Storage checklist", "Heavy items belong low: a safer vertical storage plan", "Checklist", "Storage checklist", "Simple low-to-high organization diagram", "Ready"],
  ["Small-space reset", "One clear surface can change a whole room", "Mistake and fix", "No-drill storage", "Calm side-table before-and-after", "Ready"],
  ["Small-space reset", "Where to start when every corner feels cluttered", "Checklist", "Tiny entryway", "One-zone-at-a-time checklist", "Ready"],
  ["Small-space reset", "Give loose items a home in 20 minutes", "Numbered tips", "Tiny entryway", "Tray, basket, and hook visual", "Ready"],
];
ideas.getRange("F2:F50").dataValidation = {
  rule: { type: "list", values: ["Idea", "Ready", "Designed", "Published", "Refresh"] },
};
ideas.freezePanes.freezeRows(1);
ideas.tables.add("A1:F13", true, "IdeasTable");
[22, 54, 20, 22, 48, 14].forEach((width, i) => ideas.getRangeByIndexes(0, i, 13, 1).format.columnWidth = width);

for (const [sheet, range] of [
  [pins, "A2:Q61"], [products, "A2:K25"], [setup, "A2:D13"], [ideas, "A2:F13"],
]) {
  sheet.getRange(range).format.wrapText = true;
}
pins.getRange("A2:Q61").format.rowHeight = 42;
products.getRange("A2:K25").format.rowHeight = 34;
setup.getRange("A2:D13").format.rowHeight = 34;
ideas.getRange("A2:F13").format.rowHeight = 42;

const outputDir = "E:/Amazon Aff/outputs";
await fs.mkdir(`${outputDir}/previews`, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(`${outputDir}/tidy-small-spaces-tracker.xlsx`);
for (const sheetName of ["Dashboard", "Pins", "Products", "Setup", "Content Ideas"]) {
  const image = await wb.render({ sheetName, autoCrop: "all", scale: 0.7, format: "png" });
  const name = sheetName.replaceAll(" ", "-").toLowerCase();
  await fs.writeFile(`${outputDir}/previews/${name}.png`, new Uint8Array(await image.arrayBuffer()));
}

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);
