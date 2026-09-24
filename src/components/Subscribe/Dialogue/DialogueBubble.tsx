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
  for (const character of content.querySelectorAll<HTMLElement>(".character")) {
    if (character.textContent?.trim()) {
      lineEnd = Math.max(lineEnd, character.offsetLeft + character.offsetWidth);
    }
  }
  const width = Math.ceil(lineEnd - content.offsetLeft);

  // Pull the trailing empty space past the bubble's edge, where it's clipped
  content.style.marginInlineEnd = `${width - content.offsetWidth}px`;
  bubble.style.width = `${width}px`;
  bubble.style.height = `${content.offsetHeight}px`;
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
    if (event.animationName === "bubble-out") {
      setShownText(null);
    }
  };

  useLayoutEffect(() => {
    const bubble = bubbleRef.current;
    const content = contentRef.current;
    if (!shownText || !bubble || !content) return;

    fitBubble(bubble, content);

    // Refit if the text reflows later, e.g. once a web font loads
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
        <span className="bubbleContent" ref={contentRef}>
          <DialogueLine text={shownText} />
        </span>
      </div>
    )
  );
});
