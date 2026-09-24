import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { type AnimationEvent, useEffect, useState } from "react";
import { clearSams, numSams } from "../../stores/sam";
import { STICKER_VARIANTS, Sticker } from "./Sticker";

interface StickerState {
  id: string;
  variant: number;
  exiting: boolean;
}

export const Stickers = () => {
  const [stickers, setStickers] = useState<StickerState[]>([]);
  const [shaking, setShaking] = useState(false);
  const $numSams = useStore(numSams);

  // Keep the shoo button mounted while it animates out
  const showShoo = $numSams > 2;
  const [shooMounted, setShooMounted] = useState(showShoo);
  if (showShoo && !shooMounted) {
    setShooMounted(true);
  }
  const shooLeaving = shooMounted && !showShoo;

  useEffect(() => {
    // Preload first sticker
    new Image().src = STICKER_VARIANTS[0].srcSet;
  }, []);

  useEffect(() => {
    setStickers((prev) => {
      // Send every sticker flying; each removes itself once off the canvas
      if ($numSams === 0) {
        return prev.some((sticker) => !sticker.exiting)
          ? prev.map((sticker) => ({ ...sticker, exiting: true }))
          : prev;
      }

      const active = prev.filter((sticker) => !sticker.exiting).length;
      if ($numSams <= active) return prev;

      return [
        ...prev,
        ...Array.from({ length: $numSams - active }, (_, i) => ({
          id: nanoid(),
          variant: active + i + 1,
          exiting: false,
        })),
      ];
    });
  }, [$numSams]);

  const removeSticker = (id: string) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  };

  const handleShoo = () => {
    setShaking(true);
    clearSams();
    setTimeout(() => {
      setShaking(false);
    }, 300);
  };

  const handleShooAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (shooLeaving && event.target === event.currentTarget) {
      setShooMounted(false);
    }
  };

  return (
    <div className="stickers" style={{ viewTransitionName: "stickers" }}>
      {stickers.map(({ id, variant, exiting }) => (
        <Sticker
          key={id}
          variant={variant}
          exiting={exiting}
          onExited={() => removeSticker(id)}
        />
      ))}
      {shooMounted && (
        <div
          className={classNames("shoo-wrapper", { leaving: shooLeaving })}
          onAnimationEnd={handleShooAnimationEnd}
        >
          <button
            data-sam-shoo
            onClick={handleShoo}
            className={classNames({ shaking })}
            type="button"
          >
            Shoo Sam
          </button>
        </div>
      )}
    </div>
  );
};
