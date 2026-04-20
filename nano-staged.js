export default {
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,json,jsonc,css,astro}":
    "biome check --write",
  "*.{png,jpg,gif,webp,heic,avif,mp4,mov,mkv,webm}": (api) =>
    `optimo ${api.filenames.join(" ")}`,
};
