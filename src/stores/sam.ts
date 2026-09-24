import { nanoid } from "nanoid";
import { atom, computed } from "nanostores";

export interface Sam {
  id: string;
  variant: number;
  /**
   * Flying off the canvas; removed once its exit animation ends
   */
  exiting: boolean;
}

export const sams = atom<Sam[]>([]);

export const numSams = computed(
  sams,
  (list) => list.filter((sam) => !sam.exiting).length,
);

let topZIndex = 1;

export const getTopZIndex = () => topZIndex;

export const incrementTopZIndex = () => ++topZIndex;

export const addSam = () => {
  incrementTopZIndex();
  sams.set([
    ...sams.get(),
    { id: nanoid(), variant: numSams.get() + 1, exiting: false },
  ]);
};

export const clearSams = () => {
  topZIndex = 1;
  sams.set(sams.get().map((sam) => ({ ...sam, exiting: true })));
};

export const removeSam = (id: string) => {
  sams.set(sams.get().filter((sam) => sam.id !== id));
};
