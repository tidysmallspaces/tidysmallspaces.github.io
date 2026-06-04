from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path("assets/pins/week-02-remake")
OUT_DIR.mkdir(parents=True, exist_ok=True)

W, H = 1000, 1500

COLORS = {
    "cream": "#F7F1E7",
    "paper": "#FFFDF7",
    "ink": "#243229",
    "green": "#476655",
    "sage": "#DDE8D8",
    "sand": "#F2E6D6",
    "orange": "#D97952",
    "gold": "#E4A66F",
    "red": "#C96345",
    "white": "#FFF8ED",
}

FONT_DIR = Path("C:/Windows/Fonts")


def font(name, size):
    candidates = {
        "brand": ["arialbd.ttf", "Arialbd.ttf"],
        "sans": ["arial.ttf", "Arial.ttf"],
        "sans_bold": ["arialbd.ttf", "Arialbd.ttf"],
        "serif": ["georgiab.ttf", "Georgia.ttf", "timesbd.ttf"],
    }[name]
    for candidate in candidates:
        path = FONT_DIR / candidate
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default(size)


FONTS = {
    "brand": font("brand", 27),
    "headline": font("serif", 78),
    "kicker": font("sans_bold", 34),
    "label": font("sans_bold", 31),
    "scene": font("sans_bold", 28),
    "cta": font("sans_bold", 35),
    "url": font("sans_bold", 24),
    "small": font("sans_bold", 24),
}


PINS = [
    {
        "id": "W2R-PIN-001",
        "title": ["Tiny Apartment?", "Try These", "No-Drill Ideas"],
        "kicker": "renter-friendly storage",
        "cta": "See the full guide",
        "type": "before_after",
        "accent": COLORS["orange"],
    },
    {
        "id": "W2R-PIN-002",
        "title": ["Use the Back", "of the Door", "Without Holes"],
        "kicker": "turn wasted space into storage",
        "cta": "Get the checklist",
        "type": "door",
        "accent": COLORS["gold"],
    },
    {
        "id": "W2R-PIN-003",
        "title": ["Do Not Buy", "Storage Bins", "Until You Measure"],
        "kicker": "under-bed storage mistake",
        "cta": "Read before buying",
        "type": "measure",
        "accent": COLORS["orange"],
    },
    {
        "id": "W2R-PIN-004",
        "title": ["Stop the", "Entryway Pile", "in 20 Minutes"],
        "kicker": "keys, shoes, mail, bags",
        "cta": "Use the reset",
        "type": "entry",
        "accent": COLORS["red"],
    },
    {
        "id": "W2R-PIN-005",
        "title": ["5 Hidden", "Storage Spots", "Renters Forget"],
        "kicker": "check these before buying more",
        "cta": "Find the spots",
        "type": "map",
        "accent": COLORS["gold"],
    },
    {
        "id": "W2R-PIN-006",
        "title": ["Heavy Low.", "Light High.", "Safer Shelves."],
        "kicker": "vertical storage for small homes",
        "cta": "See the plan",
        "type": "vertical",
        "accent": COLORS["orange"],
    },
]


def rounded(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text(draw, xy, value, fill, font_key, anchor=None, spacing=4):
    draw.text(xy, value, fill=fill, font=FONTS[font_key], anchor=anchor, spacing=spacing)


def draw_shell(draw, pin):
    draw.rectangle((0, 0, W, H), fill=COLORS["cream"])
    rounded(draw, (36, 36, 964, 1464), 30, COLORS["paper"], COLORS["ink"], 5)
    draw.ellipse((806, 86, 954, 234), fill=pin["accent"])
    draw.ellipse((-55, 1310, 115, 1480), fill=COLORS["sage"])
    text(draw, (74, 76), "TIDY SMALL SPACES", COLORS["ink"], "brand")
    rounded(draw, (74, 118, 234, 126), 4, COLORS["orange"])
    y = 205
    for line in pin["title"]:
        text(draw, (74, y), line, COLORS["ink"], "headline")
        y += 92
    text(draw, (74, 495), pin["kicker"], COLORS["green"], "kicker")


def draw_cta(draw, pin):
    rounded(draw, (74, 1225, 926, 1320), 22, COLORS["ink"])
    text(draw, (126, 1257), pin["cta"], COLORS["white"], "cta")
    text(draw, (74, 1382), "tidysmallspaces.github.io", COLORS["green"], "url")


def before_after(draw):
    rounded(draw, (74, 590, 926, 1070), 36, COLORS["sand"])
    rounded(draw, (106, 638, 466, 1008), 28, COLORS["white"])
    rounded(draw, (534, 638, 894, 1008), 28, COLORS["white"])
    text(draw, (142, 672), "before", COLORS["ink"], "label")
    text(draw, (570, 672), "after", COLORS["ink"], "label")
    rounded(draw, (150, 830, 360, 866), 18, COLORS["green"])
    rounded(draw, (210, 774, 330, 820), 14, "#E6C9A8")
    draw.ellipse((146, 746, 214, 814), fill=COLORS["orange"])
    rounded(draw, (585, 742, 835, 972), 22, COLORS["sage"], COLORS["ink"], 7)
    draw.line((585, 812, 835, 812), fill=COLORS["ink"], width=5)
    draw.line((585, 888, 835, 888), fill=COLORS["ink"], width=5)
    draw.ellipse((622, 762, 658, 798), fill=COLORS["orange"])
    rounded(draw, (690, 852, 770, 880), 10, COLORS["white"])
    draw.line((500, 780, 430, 780), fill=COLORS["ink"], width=10)
    draw.line((500, 780, 470, 750), fill=COLORS["ink"], width=10)
    draw.line((500, 780, 470, 810), fill=COLORS["ink"], width=10)


def door(draw):
    rounded(draw, (108, 570, 892, 1125), 36, COLORS["sage"])
    rounded(draw, (250, 625, 630, 1080), 16, COLORS["white"], COLORS["ink"], 8)
    draw.ellipse((569, 834, 601, 866), fill=COLORS["orange"])
    rounded(draw, (330, 655, 560, 995), 24, COLORS["green"])
    for y in (690, 792, 894):
        rounded(draw, (358, y, 532, y + 76), 18, COLORS["white"])
    for i, label in enumerate(["no tools", "no holes", "more room"]):
        text(draw, (660, 700 + i * 85), label, COLORS["ink"], "scene")


def measure(draw):
    rounded(draw, (84, 598, 916, 1078), 34, COLORS["ink"])
    rounded(draw, (154, 710, 594, 860), 26, COLORS["sage"])
    rounded(draw, (192, 752, 302, 818), 12, COLORS["white"])
    rounded(draw, (330, 752, 440, 818), 12, COLORS["white"])
    draw.line((158, 955, 678, 955), fill=COLORS["gold"], width=18)
    draw.line((158, 955, 206, 907), fill=COLORS["gold"], width=12)
    draw.line((158, 955, 206, 1003), fill=COLORS["gold"], width=12)
    draw.line((678, 955, 630, 907), fill=COLORS["gold"], width=12)
    draw.line((678, 955, 630, 1003), fill=COLORS["gold"], width=12)
    text(draw, (650, 700), "measure", COLORS["white"], "cta")
    for i, label in enumerate(["height", "depth", "pull-out room"]):
        text(draw, (650, 770 + i * 55), label, COLORS["white"], "scene")


def entry(draw):
    rounded(draw, (80, 590, 920, 1095), 38, COLORS["sand"])
    rounded(draw, (135, 690, 435, 1000), 28, COLORS["white"])
    text(draw, (172, 720), "daily pile", COLORS["ink"], "label")
    rounded(draw, (180, 865, 370, 903), 18, COLORS["ink"])
    rounded(draw, (210, 810, 330, 856), 12, COLORS["gold"])
    draw.ellipse((315, 790, 375, 850), fill=COLORS["green"])
    rounded(draw, (565, 660, 800, 1010), 24, COLORS["sage"])
    rounded(draw, (608, 735, 758, 783), 18, COLORS["white"])
    rounded(draw, (608, 815, 758, 863), 18, COLORS["white"])
    rounded(draw, (608, 895, 758, 943), 18, COLORS["green"])
    text(draw, (496, 1032), "one home for each item", COLORS["ink"], "scene")


def map_scene(draw):
    rounded(draw, (92, 585, 908, 1105), 34, COLORS["sage"])
    rounded(draw, (160, 655, 840, 1035), 18, COLORS["white"], COLORS["ink"], 8)
    draw.line((500, 655, 500, 1035), fill=COLORS["ink"], width=6)
    draw.line((160, 825, 840, 825), fill=COLORS["ink"], width=6)
    for xy, color in [
        ((306, 691, 394, 779), COLORS["orange"]),
        ((601, 698, 689, 786), COLORS["gold"]),
        ((266, 881, 354, 969), COLORS["green"]),
        ((646, 886, 734, 974), COLORS["orange"]),
    ]:
        draw.ellipse(xy, fill=color)
    text(draw, (238, 1078), "doors | beds | corners | high shelves", COLORS["ink"], "small")


def vertical(draw):
    rounded(draw, (100, 605, 900, 1105), 36, COLORS["white"])
    for y in (700, 842, 984):
        rounded(draw, (210, y, 790, y + 28), 14, COLORS["ink"])
    rounded(draw, (276, 915, 456, 981), 14, COLORS["orange"])
    rounded(draw, (520, 780, 644, 840), 14, COLORS["sage"])
    draw.ellipse((312, 622, 388, 698), fill=COLORS["sage"])
    for y, label in [(740, "light items high"), (882, "daily items middle"), (1024, "heavy items low")]:
        text(draw, (260, y), label, COLORS["ink"], "scene")


SCENES = {
    "before_after": before_after,
    "door": door,
    "measure": measure,
    "entry": entry,
    "map": map_scene,
    "vertical": vertical,
}


for pin in PINS:
    img = Image.new("RGB", (W, H), COLORS["cream"])
    draw = ImageDraw.Draw(img)
    draw_shell(draw, pin)
    SCENES[pin["type"]](draw)
    draw_cta(draw, pin)
    img.save(OUT_DIR / f"{pin['id']}.png", quality=95)

print(f"Generated {len(PINS)} redesigned PNG pins in {OUT_DIR}.")
