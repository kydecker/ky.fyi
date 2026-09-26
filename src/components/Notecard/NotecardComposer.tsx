import {
  type ChangeEvent,
  type SubmitEventHandler,
  useEffect,
  useState,
} from "react";

import {
  AUTHOR_MAX_LENGTH,
  CONTENT_MAX_LENGTH,
  NOTECARD_THEMES,
} from "./constants";
import styles from "./notecard.module.css";

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
      e.target.value.length > CONTENT_MAX_LENGTH
    ) {
      setContentValue(contentValue);
      setErrorMessage("There's not enough room for that.");
    } else {
      setContentValue(e.target.value);
      setErrorMessage(null);
    }
  };

  const handleNextTheme = () => {
    setSelectedTheme(nextThemeIndex);
  };

  const handlePrevTheme = () => {
    setSelectedTheme(prevThemeIndex);
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
        return;
      }

      const data = await res
        .json<{ error?: string }>()
        .catch(() => ({}) as { error?: string });
      const message =
        typeof data.error === "string" ? data.error : "Something went wrong.";
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
            maxLength={AUTHOR_MAX_LENGTH}
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
