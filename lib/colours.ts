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
  "Black and Gold": "#2b2418",
  Aqua: "#5cc8c2",
  "Blue and Red": "#2a4a9b",
  Lilac: "#c8a2c8",
  "Silver-Gold": "#cfc29a",
  Turquoise: "#30b5b0",
  "Magenta Pink": "#c2307a",
  "Grey with Yellow": "#9a9a92",
  "Light Grey": "#d3d3d0",
  "Sky Blue": "#8ec5e8",
  Pink: "#e78fb0",
  Beige: "#e3d3b4",
  "Onion Pink": "#e3a4a8",
  Grey: "#8a8a88",
  Blue: "#2f5fb3",
  "Pink and Silver": "#d98cb3",
  "Teal and Gold": "#1f8a8a",
  Magenta: "#c0307f",
  Olive: "#7d7d4f",
  "Purple and Silver": "#7a5a9a",
  Green: "#7fa84a",
  "Pink and Blue": "#e0607e",
  Golden: "#c9a85a",
  "Pink and Teal": "#d98ba8",
  Charcoal: "#4a4f57",
  Emerald: "#11845a",
  "Red and Green": "#c8202f",
  "Golden Yellow": "#f2b01e",
  "Royal Blue and Teal": "#2456c8",
  "Red and Ivory": "#c22a32",
  Mint: "#cfe3b8",
  "Rose Gold": "#d0645c",
  "Pastel Aqua": "#a9d6dc",
  "Olive Green": "#9a9a68",
  "Magenta and Gold": "#d443a8",
  "Maroon and Gold": "#5c1a3c",
  /* Exact shade was not confirmed, so the swatch stays neutral. */
  "Bright shade": "#c8c2b8",
};

export function swatchFor(colour: string) {
  return colourSwatchMap[colour] ?? "#6b7280";
}

/**
 * Catalogue colour filter: each saree's colour is grouped by its main shade so
 * the filter shows a short, distinct palette. Order here is the display order.
 * Colours not listed (e.g. "Bright shade") are not filterable.
 */
export const colourFamilies: { name: string; hex: string; members: string[] }[] = [
  { name: "Red", hex: "#c0262f", members: ["Red", "Red and Green", "Red and Ivory", "Rose Gold"] },
  { name: "Maroon & Wine", hex: "#6a1a2c", members: ["Maroon", "Wine", "Maroon and Gold"] },
  {
    name: "Pink & Peach",
    hex: "#f2a7bd",
    members: [
      "Pink",
      "Baby Pink",
      "Light Baby Pink",
      "Onion Pink",
      "Pink and Blue",
      "Pink and Silver",
      "Pink and Teal",
      "Peach with Ice Blue",
    ],
  },
  { name: "Magenta", hex: "#c2307f", members: ["Magenta", "Magenta Pink", "Magenta and Gold"] },
  {
    name: "Purple & Lilac",
    hex: "#8e6bbf",
    members: ["Purple", "Lavender", "Lilac", "Purple and Silver"],
  },
  {
    name: "Blue",
    hex: "#2f5fb3",
    members: [
      "Blue",
      "Blue and Red",
      "Bright Blue with Red",
      "Sky Blue",
      "Royal Blue and Teal",
      "Light Blue with Teal Green",
    ],
  },
  {
    name: "Teal & Turquoise",
    hex: "#1fa3a3",
    members: ["Turquoise", "Teal and Gold", "Aqua", "Pastel Aqua"],
  },
  {
    name: "Green",
    hex: "#2f7a4a",
    members: ["Green", "Dark Green", "Emerald", "Mint", "Olive", "Olive Green"],
  },
  { name: "Yellow & Gold", hex: "#e0b030", members: ["Golden Yellow", "Golden", "Silver-Gold"] },
  { name: "Orange", hex: "#e0682b", members: ["Orange and Red"] },
  { name: "Cream & Beige", hex: "#efe4cc", members: ["Cream", "Beige"] },
  {
    name: "Grey & Silver",
    hex: "#9aa0a6",
    members: ["Grey", "Light Grey", "Charcoal", "Silver", "Grey with Yellow"],
  },
  { name: "Black", hex: "#1a1a1a", members: ["Black", "Black and Gold"] },
];

export function colourFamilyFor(colour: string) {
  return colourFamilies.find((family) => family.members.includes(colour))?.name;
}

export function familySwatch(name: string) {
  return colourFamilies.find((family) => family.name === name)?.hex ?? "#6b7280";
}

export function isLightSwatch(hex: string) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return false;
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 186;
}
