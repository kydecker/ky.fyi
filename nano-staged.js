export default {
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,css,astro}":
    "biome check --write",
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,astro,mdx}": () => "knip",
};
