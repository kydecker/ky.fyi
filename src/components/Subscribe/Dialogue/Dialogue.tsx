import "./dialogue.css";

import { AnimatePresence, LazyMotion } from "motion/react";
import React from "react";

import { DialogueBubble } from "./DialogueBubble";
import { Emote, type EmoteType } from "./Emote";

const loadFeatures = () =>
  import("./motionFeatures").then((res) => res.default);

interface DialogueProps {
  text: string | null;
  emote: EmoteType;
  onEmoteClick: () => void;
}

export const Dialogue = React.memo(
  ({ text, emote, onEmoteClick }: DialogueProps) => {
    return (
      <div className="dialogueContainer">
        <LazyMotion features={loadFeatures} strict>
          <AnimatePresence>
            <DialogueBubble text={text} key="bubble" />
            <Emote emote={emote} key="emote" onEmoteClick={onEmoteClick} />
          </AnimatePresence>
        </LazyMotion>
      </div>
    );
  },
);
