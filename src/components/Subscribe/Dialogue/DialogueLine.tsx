import { type CSSProperties, Fragment } from "react";

interface DialogueLineProps {
  text: string;
}

export const DialogueLine = ({ text }: DialogueLineProps) => {
  let offset = 0;

  return text.split(" ").map((word, wordIndex) => {
    const start = offset;
    // Spaces still take a turn in the typing sequence
    offset += word.length + 1;

    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: text is static per phrase
      <Fragment key={wordIndex}>
        {wordIndex > 0 && " "}
        <span className="word">
          {word.split("").map((character, characterIndex) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: text is static per phrase
              key={characterIndex}
              className="character"
              style={{ "--index": start + characterIndex } as CSSProperties}
            >
              {character}
            </span>
          ))}
        </span>
      </Fragment>
    );
  });
};
