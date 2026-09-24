import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { useEffect } from "react";
import { clearSams, numSams, sams } from "../../stores/sam";
import { getStickerVariant, Sticker } from "./Sticker";

export const Stickers = () => {
  const $sams = useStore(sams);
  const $numSams = useStore(numSams);

  // Preload and decode the next two stickers' images
  useEffect(() => {
    for (const variant of [$numSams + 1, $numSams + 2]) {
      const image = new Image();
      image.src = getStickerVariant(variant).srcSet;
      image.decode().catch(() => {});
    }
  }, [$numSams]);

  const showShoo = $numSams > 2;
  // Keep the hidden button mounted until the last sticker leaves
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
