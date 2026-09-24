import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { useEffect } from "react";
import { clearSams, numSams, sams } from "../../stores/sam";
import { STICKER_VARIANTS, Sticker } from "./Sticker";

export const Stickers = () => {
  const $sams = useStore(sams);
  const $numSams = useStore(numSams);

  useEffect(() => {
    // Preload first sticker
    new Image().src = STICKER_VARIANTS[0].srcSet;
  }, []);

  const showShoo = $numSams > 2;
  // Stay mounted, hidden, until the last shooed sticker is gone
  const shooLeaving = $sams.length > 0 && $sams.every((sam) => sam.exiting);

  return (
    <div className="stickers" style={{ viewTransitionName: "stickers" }}>
      {$sams.map((sam) => (
        <Sticker key={sam.id} {...sam} />
      ))}
      {(showShoo || shooLeaving) && (
        <div className={classNames("shoo-wrapper", { leaving: shooLeaving })}>
          <button data-sam-shoo onClick={clearSams} type="button">
            Shoo Sam
          </button>
        </div>
      )}
    </div>
  );
};
