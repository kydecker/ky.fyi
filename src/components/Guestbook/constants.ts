type NotecardTheme = {
  src: string;
  alt: string;
};

const images = import.meta.glob<ImageMetadata>("./images/notecard*.webp", {
  eager: true,
  import: "default",
});

function imageSrc(theme: number) {
  return images[`./images/notecard${theme}.webp`].src;
}

export const NOTECARD_THEMES: Record<number, NotecardTheme> = {
  1: { src: imageSrc(1), alt: "plain background" },
  2: { src: imageSrc(2), alt: "wavy pencil border" },
  3: { src: imageSrc(3), alt: "straight pencil border" },
  4: {
    src: imageSrc(4),
    alt: "rounded card with green dotted border",
  },
  5: {
    src: imageSrc(5),
    alt: "angular card with yellow lined border",
  },
  6: {
    src: imageSrc(6),
    alt: "multicolor plaid border",
  },
  7: {
    src: imageSrc(7),
    alt: "grassy green background with zigzag edges",
  },
  8: {
    src: imageSrc(8),
    alt: "wavy blue background with wavy edges",
  },
  9: {
    src: imageSrc(9),
    alt: "horizontal purple strokes",
  },
  10: {
    src: imageSrc(10),
    alt: "red stamp with a hand holding a match",
  },
  11: {
    src: imageSrc(11),
    alt: "red stamp with a woman sitting at a piano",
  },
  12: {
    src: imageSrc(12),
    alt: "red stamp with a cat playing a tuba",
  },
  13: {
    src: imageSrc(13),
    alt: "washi tape with capybaras",
  },
  14: {
    src: imageSrc(14),
    alt: "washi tape with colorful squiggles",
  },
  15: {
    src: imageSrc(15),
    alt: "washi tape with flowers and leaves",
  },
  16: {
    src: imageSrc(16),
    alt: "yellow single-stroke flower",
  },
  17: {
    src: imageSrc(17),
    alt: "green single-stroke flower",
  },
  18: {
    src: imageSrc(18),
    alt: "purple single-stroke flower",
  },
  19: {
    src: imageSrc(19),
    alt: "green 'contains spoilers' sticker",
  },
  20: {
    src: imageSrc(20),
    alt: "blue 'based on an untrue story' sticker",
  },
  21: {
    src: imageSrc(21),
    alt: "red 'pseudo deep' sticker",
  },
  22: {
    src: imageSrc(22),
    alt: "pink 'vaginal' sticker",
  },
  23: {
    src: imageSrc(23),
    alt: "yellow 'oral' sticker",
  },
  24: { src: imageSrc(24), alt: "brown 'anal' sticker" },
  25: {
    src: imageSrc(25),
    alt: "colored pencil yellow-orange background",
  },
  26: {
    src: imageSrc(26),
    alt: "colored pencil blue-green",
  },
  27: {
    src: imageSrc(27),
    alt: "colored pencil red-purple-pink",
  },
  28: {
    src: imageSrc(28),
    alt: "diagonal green stripes",
  },
  29: { src: imageSrc(29), alt: "green polka dot" },
  30: {
    src: imageSrc(30),
    alt: "yellow vertical stripes",
  },
  31: { src: imageSrc(31), alt: "red gemstone hearts" },
  32: { src: imageSrc(32), alt: "diagonal rainbow" },
  33: { src: imageSrc(33), alt: "rainbow arc" },
  34: { src: imageSrc(34), alt: "horizontal rainbow" },
  35: {
    src: imageSrc(35),
    alt: "gold-and-purple spray paint 1",
  },
  36: {
    src: imageSrc(36),
    alt: "gold-and-purple spray paint 2",
  },
  37: {
    src: imageSrc(37),
    alt: "gold-and-purple spray paint 3",
  },
};

export const AUTHOR_MAX_LENGTH = 28;
export const CONTENT_MAX_LENGTH = 140;
