import "./dialogue.css";

import classNames from "classnames";
import React, {
  type AnimationEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { DialogueLine } from "./DialogueLine";

interface DialogueBubbleProps {
  text: string | null;
}

/**
 * Size the bubble to the widest rendered line
 */
const fitBubble = (bubble: HTMLElement, content: HTMLElement) => {
  let lineEnd = 0;
  for (const word of content.querySelectorAll<HTMLElement>(".word")) {
    lineEnd = Math.max(lineEnd, word.offsetLeft + word.offsetWidth);
  }
  const width = Math.ceil(lineEnd - content.offsetLeft);
  const { offsetWidth, offsetHeight } = content;

  // Pull the trailing empty space past the bubble's edge, where it's clipped
  content.style.marginInlineEnd = `${width - offsetWidth}px`;
  bubble.style.width = `${width}px`;
  bubble.style.height = `${offsetHeight}px`;
};

export const DialogueBubble = React.memo(({ text }: DialogueBubbleProps) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  // Keep showing the last phrase while the bubble animates out
  const [shownText, setShownText] = useState(text);
  if (text && text !== shownText) {
    setShownText(text);
  }
  const exiting = !text && !!shownText;

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    // Ignore the characters' animations bubbling up
    if (exiting && event.target === event.currentTarget) {
      setShownText(null);
    }
  };

  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    const content = contentRef.current;
    if (!shownText || !bubble || !content) return;

    // Fires once on observe, before paint, and again if the text reflows
    // later, e.g. once a web font loads
    const observer = new ResizeObserver(() => fitBubble(bubble, content));
    observer.observe(content);

    return () => observer.disconnect();
  }, [shownText]);

  return (
    shownText && (
      <div
        className={classNames("bubble", { exiting })}
        ref={bubbleRef}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden
      >
        <span className="bubbleContent" ref={contentRef} key={shownText}>
          <DialogueLine text={shownText} />
        </span>
      </div>
    )
  );
});
