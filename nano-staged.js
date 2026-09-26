export default {
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,css,astro}":
    "biome check --write",
  // Functions don't get staged filenames appended; knip checks the whole project
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,astro,mdx}": () => "knip",
};
