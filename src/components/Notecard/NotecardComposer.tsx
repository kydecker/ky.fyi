import * as Fathom from "fathom-client";
import {
  type ChangeEvent,
  type SubmitEventHandler,
  useEffect,
  useState,
} from "react";

import styles from "./notecard.module.css";

type NotecardTheme = {
  src: string;
  alt: string;
};

export const NOTECARD_THEMES: Record<number, NotecardTheme> = {
  1: { src: "/images/notecards/notecard1.webp", alt: "plain background" },
  2: { src: "/images/notecards/notecard2.webp", alt: "wavy pencil border" },
  3: { src: "/images/notecards/notecard3.webp", alt: "straight pencil border" },
  4: {
    src: "/images/notecards/notecard4.webp",
    alt: "rounded card with green dotted border",
  },
  5: {
    src: "/images/notecards/notecard5.webp",
    alt: "angular card with yellow lined border",
  },
  6: {
    src: "/images/notecards/notecard6.webp",
    alt: "multicolor plaid border",
  },
  7: {
    src: "/images/notecards/notecard7.webp",
    alt: "grassy green background with zigzag edges",
  },
  8: {
    src: "/images/notecards/notecard8.webp",
    alt: "wavy blue background with wavy edges",
  },
  9: {
    src: "/images/notecards/notecard9.webp",
    alt: "horizontal purple strokes",
  },
  10: {
    src: "/images/notecards/notecard10.webp",
    alt: "red stamp with a hand holding a match",
  },
  11: {
    src: "/images/notecards/notecard11.webp",
    alt: "red stamp with a woman sitting at a piano",
  },
  12: {
    src: "/images/notecards/notecard12.webp",
    alt: "red stamp with a cat playing a tuba",
  },
  13: {
    src: "/images/notecards/notecard13.webp",
    alt: "washi tape with capybaras",
  },
  14: {
    src: "/images/notecards/notecard14.webp",
    alt: "washi tape with colorful squiggles",
  },
  15: {
    src: "/images/notecards/notecard15.webp",
    alt: "washi tape with flowers and leaves",
  },
  16: {
    src: "/images/notecards/notecard16.webp",
    alt: "yellow single-stroke flower",
  },
  17: {
    src: "/images/notecards/notecard17.webp",
    alt: "green single-stroke flower",
  },
  18: {
    src: "/images/notecards/notecard18.webp",
    alt: "purple single-stroke flower",
  },
  19: {
    src: "/images/notecards/notecard19.webp",
    alt: "green 'contains spoilers' sticker",
  },
  20: {
    src: "/images/notecards/notecard20.webp",
    alt: "blue 'based on an untrue story' sticker",
  },
  21: {
    src: "/images/notecards/notecard21.webp",
    alt: "red 'pseudo deep' sticker",
  },
  22: {
    src: "/images/notecards/notecard22.webp",
    alt: "pink 'vaginal' sticker",
  },
  23: {
    src: "/images/notecards/notecard23.webp",
    alt: "yellow 'oral' sticker",
  },
  24: { src: "/images/notecards/notecard24.webp", alt: "brown 'anal' sticker" },
  25: {
    src: "/images/notecards/notecard25.webp",
    alt: "colored pencil yellow-orange background",
  },
  26: {
    src: "/images/notecards/notecard26.webp",
    alt: "colored pencil blue-green",
  },
  27: {
    src: "/images/notecards/notecard27.webp",
    alt: "colored pencil red-purple-pink",
  },
  28: {
    src: "/images/notecards/notecard28.webp",
    alt: "diagonal green stripes",
  },
  29: { src: "/images/notecards/notecard29.webp", alt: "green polka dot" },
  30: {
    src: "/images/notecards/notecard30.webp",
    alt: "yellow vertical stripes",
  },
  31: { src: "/images/notecards/notecard31.webp", alt: "red gemstone hearts" },
  32: { src: "/images/notecards/notecard32.webp", alt: "diagonal rainbow" },
  33: { src: "/images/notecards/notecard33.webp", alt: "rainbow arc" },
  34: { src: "/images/notecards/notecard34.webp", alt: "horizontal rainbow" },
  35: {
    src: "/images/notecards/notecard35.webp",
    alt: "gold-and-purple spray paint 1",
  },
  36: {
    src: "/images/notecards/notecard36.webp",
    alt: "gold-and-purple spray paint 2",
  },
  37: {
    src: "/images/notecards/notecard37.webp",
    alt: "gold-and-purple spray paint 3",
  },
};

export const NotecardComposer = () => {
  const [selectedTheme, setSelectedTheme] = useState(1);
  const [contentValue, setContentValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalThemes = Object.keys(NOTECARD_THEMES).length;

  const getNextThemeIndex = (currentIndex: number) => {
    return currentIndex === totalThemes ? 1 : currentIndex + 1;
  };

  const getPrevThemeIndex = (currentIndex: number) => {
    return currentIndex === 1 ? totalThemes : currentIndex - 1;
  };

  const nextThemeIndex = getNextThemeIndex(selectedTheme);
  const prevThemeIndex = getPrevThemeIndex(selectedTheme);

  // Preload adjacent themes
  useEffect(() => {
    new Image().src = NOTECARD_THEMES[nextThemeIndex].src;
    new Image().src = NOTECARD_THEMES[prevThemeIndex].src;
  }, [nextThemeIndex, prevThemeIndex]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target;
    const parent = content.parentElement;
    if (!parent) return;

    if (
      content.scrollHeight > parent.clientHeight ||
      e.target.value.length > 140
    ) {
      setContentValue(contentValue);
      setErrorMessage("There's not enough room for that.");
      Fathom.trackEvent("guestbook: show textarea warning");
    } else {
      setContentValue(e.target.value);
      setErrorMessage(null);
    }
  };

  const handleNextTheme = () => {
    setSelectedTheme(nextThemeIndex);
    Fathom.trackEvent("guestbook: next theme");
  };

  const handlePrevTheme = () => {
    setSelectedTheme(prevThemeIndex);
    Fathom.trackEvent("guestbook: prev theme");
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/guestbook";
        Fathom.trackEvent("guestbook: submit");
        return;
      }

      const data = await res.json().catch(() => ({}));
      const message =
        typeof data?.error === "string" ? data.error : "Something went wrong.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className={styles.composer}>
        <img
          className={styles.background}
          src={NOTECARD_THEMES[selectedTheme].src}
          alt={NOTECARD_THEMES[selectedTheme].alt}
        />
        <div className={styles.top}>
          <label htmlFor="content" hidden>
            Message
          </label>
          <textarea
            className={styles.content}
            id="content"
            name="content"
            placeholder="Leave a message, write a poem, draw some ASCII art..."
            required
            rows={5}
            cols={28}
            wrap="hard"
            onChange={handleContentChange}
            value={contentValue}
            disabled={isSubmitting}
          />
          {errorMessage && <div className={styles.warning}>{errorMessage}</div>}
        </div>
        <div className={styles.bottom}>
          <label htmlFor="author" hidden>
            Your name
          </label>
          <input
            className={styles.name}
            type="text"
            id="author"
            name="author"
            placeholder="Your name"
            required
            maxLength={28}
            autoComplete="off"
            data-1p-ignore
            disabled={isSubmitting}
          />
          <label htmlFor="url" hidden>
            Your URL
          </label>
          <input
            className={styles.url}
            type="url"
            id="url"
            name="url"
            placeholder="URL (optional)"
            autoComplete="off"
            data-1p-ignore
            disabled={isSubmitting}
          />
          <label htmlFor="special" hidden>
            <input id="special" name="special" aria-hidden />
          </label>
        </div>
        <div className={styles.controls}>
          <div className={styles.styleWrapper}>
            <div className={styles.style}>
              <button
                type="button"
                onClick={handlePrevTheme}
                aria-label={`Change to previous theme: ${NOTECARD_THEMES[prevThemeIndex].alt}`}
                disabled={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                </svg>
              </button>
              <div aria-hidden>Style</div>
              <input type="hidden" name="theme" value={selectedTheme} />
              <button
                type="button"
                onClick={handleNextTheme}
                aria-label={`Change to next theme: ${NOTECARD_THEMES[nextThemeIndex].alt}`}
                disabled={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                </svg>
              </button>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              fill="currentColor"
            >
              <path d="M3 12.9999H9V10.9999H3V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V12.9999Z" />
            </svg>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
