import "./dialogue.css";

import React from "react";

import { DialogueBubble } from "./DialogueBubble";
import { Emote, type EmoteType } from "./Emote";

interface DialogueProps {
  text: string | null;
  emote: EmoteType;
  onEmoteClick: () => void;
}

export const Dialogue = React.memo(
  ({ text, emote, onEmoteClick }: DialogueProps) => {
    return (
      <div className="dialogueContainer">
        <DialogueBubble text={text} />
        <Emote emote={emote} onEmoteClick={onEmoteClick} />
      </div>
    );
  },
);
