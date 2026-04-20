import type { Variants } from "motion/react";
import * as m from "motion/react-m";
import { nanoid } from "nanoid";

const SPEED = 0.04;

interface TypedCharacterProps {
  /**
   * Character to render
   */
  character: string;

  /**
   * Index of the character to be rendered
   * to stagger animations
   */
  index: number;

  /**
   * Speed to display characters
   * Lower is faster
   */
  speed?: number;

  /**
   * Amount to delay the initial typing sequence
   * @default 0.2
   */
  delay?: number;
}

const TypedCharacter = ({
  character,
  index,
  speed = SPEED,
  delay = 0.2,
}: TypedCharacterProps) => {
  const characterVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * speed + delay,
      },
    },
  };

  return (
    <m.span
      className="character"
      variants={characterVariants}
      style={{ animationDelay: `${index * speed + delay}s` }}
    >
      {character}
    </m.span>
  );
};

interface DialogueLineProps {
  /**
   * Text to display
   */
  text: string;

  /**
   * Starting character index for continuous animation
   * across line fragments and styles
   * @default 0
   */
  index?: number;

  /**
   * Speed to display characters
   */
  speed?: number;
}

export const DialogueLine = ({
  text,
  index = 0,
  speed = SPEED,
}: DialogueLineProps) => {
  const words = text.split(" ");

  return words.map((word, wordIndex) => (
    <span className="word" key={nanoid()}>
      {word.split("").map((char) => {
        return (
          <TypedCharacter
            key={nanoid()}
            character={char}
            index={index++}
            speed={speed}
          />
        );
      })}
      {wordIndex < words.length - 1 && (
        <TypedCharacter key={nanoid()} character=" " index={index++} />
      )}
    </span>
  ));
};
