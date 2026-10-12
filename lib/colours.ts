/** Display hex values for colour swatches across catalogue and detail pages. */
export const colourSwatchMap: Record<string, string> = {
  "Ruby Red": "#9b1b30",
  Ivory: "#f3efe6",
  Jade: "#2f7a5c",
  "Midnight Blue": "#0a2472",
  Marigold: "#e2a015",
  Gold: "#c9a227",
  "Peacock Green": "#0d5c4d",
  Rose: "#c96b8a",
  Silver: "#b8bec6",
  Crimson: "#b01030",
  Orange: "#d96a1f",
  Teal: "#1a7a7a",
  Red: "#b42334",
  Maroon: "#6e1b2a",
  Purple: "#6b3fa0",
  Wine: "#722f37",
  "Bright Blue with Red": "#1d4e89",
  "Dark Green": "#1b4d3e",
  "Baby Pink": "#f4c2d0",
  "Peach with Ice Blue": "#f3c1a8",
  "Light Baby Pink": "#f6d5df",
  "Light Blue with Teal Green": "#7ec8d4",
  Cream: "#f3ead7",
  Black: "#1a1a1a",
  Lavender: "#c4b5e0",
  "Orange and Red": "#e05a2b",
  /* Exact shade was not confirmed, so the swatch stays neutral. */
  "Bright shade": "#c8c2b8",
};

export function swatchFor(colour: string) {
  return colourSwatchMap[colour] ?? "#6b7280";
}

export function isLightSwatch(hex: string) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 186;
}
