import "./stickers.css";

import { getRandomValueBetween } from "../../helpers";
import { STICKER_VARIANTS } from "./variants";

// Matches .sticker's width in stickers.css
const STICKER_SIZE = 200;

interface Sticker {
  x: number;
  y: number;
  exiting: boolean;
  dragOffset: { x: number; y: number } | null;
}

// Every sticker on screen, including ones animating out
const stickers = new Map<HTMLElement, Sticker>();
let activeCount = 0;
let topZIndex = 1;

const getStickerVariant = (variant: number) =>
  STICKER_VARIANTS[variant % STICKER_VARIANTS.length];

// Away from the viewport's center, until fully past the edge it crosses
const getExitPosition = (x: number, y: number) => {
  const { innerWidth: width, innerHeight: height } = window;
  const centerX = x + STICKER_SIZE / 2;
  const centerY = y + STICKER_SIZE / 2;

  const angle = Math.atan2(centerY - height / 2, centerX - width / 2);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  const distanceToExit = (center: number, direction: number, size: number) =>
    direction === 0
      ? Number.POSITIVE_INFINITY
      : ((direction > 0 ? size + STICKER_SIZE : -STICKER_SIZE) - center) /
        direction;

  const distance = Math.min(
    distanceToExit(centerX, dx, width),
    distanceToExit(centerY, dy, height),
  );

  return { x: x + dx * distance, y: y + dy * distance };
};

const container = document.createElement("div");
container.className = "stickers";
container.innerHTML = `<div class="shoo-wrapper" hidden><button data-sam-shoo type="button">Shoo Sam</button></div>`;
document.body.appendChild(container);

const shooWrapper = container.firstElementChild as HTMLDivElement;

// Preload and decode a sticker's image before it's needed
const preload = (variant: number) => {
  const image = new Image();
  image.src = getStickerVariant(variant).srcSet;
  image.decode().catch(() => {});
};

const update = () => {
  const showShoo = activeCount > 2;
  // Keep the hidden button mounted until the last sticker leaves
  const shooLeaving = stickers.size > 0 && activeCount === 0;

  shooWrapper.classList.toggle("leaving", shooLeaving);
  shooWrapper.hidden = !(showShoo || shooLeaving);
};

const createSticker = (variant: number) => {
  const { path, srcSet, src, alt } = getStickerVariant(variant);
  const x = getRandomValueBetween(0, window.innerWidth - STICKER_SIZE);
  const y = getRandomValueBetween(0, window.innerHeight - STICKER_SIZE);
  const rotate = getRandomValueBetween(-10, 10);

  const element = document.createElement("div");
  element.className = "sticker";
  element.dataset.testid = "samSticker";
  element.style.cssText = `
    z-index: ${topZIndex};
    translate: ${x}px ${y}px;
    --rotate: ${rotate}deg;
    --start-rotate: ${rotate + getRandomValueBetween(-20, 20)}deg;
    --exit-rotate: ${getRandomValueBetween(-90, 90)}deg;
    --exit-delay: ${getRandomValueBetween(0.1, 0.4)}s;
  `;
  element.innerHTML = `
    <svg class="stickerSvg" width="400" viewBox="0 0 400 400" fill="none">
      <path class="stickerPath" d="${path}" fill="white" />
    </svg>
    <picture class="stickerPicture">
      <source srcset="${srcSet}" type="image/webp" />
      <img src="${src}" alt="${alt}" draggable="false" />
    </picture>
  `;

  stickers.set(element, { x, y, exiting: false, dragOffset: null });
  return element;
};

const exitSticker = (element: HTMLElement, sticker: Sticker) => {
  const exitPosition = getExitPosition(sticker.x, sticker.y);
  element.style.setProperty("--exit-x", `${exitPosition.x}px`);
  element.style.setProperty("--exit-y", `${exitPosition.y}px`);
  element.classList.add("exiting");
  sticker.exiting = true;
};

const findSticker = (event: Event) => {
  const element = (event.target as Element).closest<HTMLElement>(".sticker");
  const sticker = element && stickers.get(element);
  return sticker ? { element, sticker } : null;
};

const handlePointerUp = (event: PointerEvent) => {
  const found = findSticker(event);
  if (!found) return;

  found.sticker.dragOffset = null;
  found.element.classList.remove("dragging");
};

container.addEventListener("pointerdown", (event) => {
  const found = findSticker(event);
  if (!found) return;
  const { element, sticker } = found;

  // Prevent text selection and native image drag
  event.preventDefault();
  // Capture on the path so fast drags keep tracking
  (event.target as Element).setPointerCapture(event.pointerId);
  sticker.dragOffset = {
    x: event.clientX - sticker.x,
    y: event.clientY - sticker.y,
  };
  element.classList.add("dragging");
  element.style.zIndex = String(++topZIndex);
});

container.addEventListener("pointermove", (event) => {
  const found = findSticker(event);
  const dragOffset = found?.sticker.dragOffset;
  if (!found || !dragOffset || found.sticker.exiting) return;
  const { element, sticker } = found;

  sticker.x = event.clientX - dragOffset.x;
  sticker.y = event.clientY - dragOffset.y;
  element.style.translate = `${sticker.x}px ${sticker.y}px`;
});

container.addEventListener("pointerup", handlePointerUp);
container.addEventListener("pointercancel", handlePointerUp);

container.addEventListener("animationend", (event) => {
  const element = event.target as HTMLElement;
  if (stickers.get(element)?.exiting) {
    element.remove();
    stickers.delete(element);
    update();
  }
});

export const addSam = () => {
  topZIndex++;
  container.insertBefore(createSticker(activeCount + 1), shooWrapper);
  activeCount++;
  update();
  // Earlier calls already preloaded the next one
  preload(activeCount + 2);
};

const clearSams = () => {
  topZIndex = 1;
  for (const [element, sticker] of stickers) {
    if (!sticker.exiting) exitSticker(element, sticker);
  }
  activeCount = 0;
  update();
};

shooWrapper.addEventListener("click", clearSams);

preload(1);
preload(2);
