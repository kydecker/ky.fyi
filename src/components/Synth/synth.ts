import { Howler } from "howler";
import { getRandomValueBetween } from "../../helpers/getRandomValueBetween";
import { sounds, uiReady } from "./sounds";
import { unmute } from "./unmute";

const STAFF_TYPE_PREFIX = "staff-";
const NOTEHEAD_PREFIX = "note-";

type NoteName =
  | "C3"
  | "Csharp3"
  | "D3"
  | "Dsharp3"
  | "E3"
  | "F3"
  | "Fsharp3"
  | "G3"
  | "Gsharp3"
  | "A3"
  | "Asharp3"
  | "B3"
  | "C4"
  | "Csharp4"
  | "D4"
  | "Dsharp4"
  | "E4";

/** Lowercased keyboard `e.key` → note (keydown + keyup). */
const KEY_TO_NOTE: Record<string, NoteName | undefined> = {
  a: "C3",
  w: "Csharp3",
  s: "D3",
  e: "Dsharp3",
  d: "E3",
  f: "F3",
  t: "Fsharp3",
  g: "G3",
  y: "Gsharp3",
  h: "A3",
  u: "Asharp3",
  j: "B3",
  k: "C4",
  o: "Csharp4",
  l: "D4",
  p: "Dsharp4",
  ";": "E4",
  ":": "E4",
};

export function loadSynth(synth: HTMLElement) {
  Howler.autoUnlock = false;
  Howler.volume(0.5);

  const keys: NodeListOf<SVGGElement> = synth.querySelectorAll(".synth-key");
  const instrumentIcons: NodeListOf<SVGGElement> =
    synth.querySelectorAll(".instrument");
  const instrumentIconWrapper: SVGGElement | null =
    synth.querySelector(".synth-instrument");
  const noteheads: NodeListOf<SVGPolygonElement> =
    synth.querySelectorAll(".notehead");
  const keyLetters: NodeListOf<SVGElement> =
    synth.querySelectorAll(".key-letter");
  const prevArrow: SVGElement | null = synth.querySelector(".instrument-prev");
  const nextArrow: SVGElement | null = synth.querySelector(".instrument-next");

  // State -------------------------------------------------------//
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  const numInstruments = sounds.instruments.length;

  let activeInstrument = 0;
  let isMouseDown = false;
  let lettersHidden = false;
  let noteFadeOut: ReturnType<typeof setTimeout>;

  const enableSynth = async () => {
    for (const { howl } of sounds.instruments) {
      howl.load();
    }
    // Wait for the roulette's click/ding so it doesn't start silent
    await uiReady;
    setRandomInstrument(revealKeyboardLetters);
  };

  // Instrument Chooser -----------------------------------------//
  const setRandomInstrument = (callback?: () => void) => {
    synth.dataset.state = "spinning";

    const baseSpeed = getRandomValueBetween(30, 50); // Lower is faster
    const force = getRandomValueBetween(5, 30); // How hard do you 'pull down the wheel'?
    const slowestSpeed = 700; // How slow can the roulette go before ending?
    const friction = 1.3; // How quickly to put on the brakes (1 to 1.5)

    let speed = baseSpeed;
    let i = 1;

    const roulette = () => {
      stepInstrument(1);
      i++;

      if (speed >= slowestSpeed) {
        sounds.ui.ding.howl.play();
        synth.dataset.state = "ready";
        callback?.();
      } else {
        speed *= friction;
        if (i <= force) {
          speed *= 0.8;
        }
        setTimeout(roulette, speed);
      }
    };

    setTimeout(roulette, speed);
  };

  const stepInstrument = (delta: 1 | -1) => {
    activeInstrument =
      (activeInstrument + delta + numInstruments) % numInstruments;
    instrumentIcons.forEach((icon, i) => {
      icon.classList.toggle("active", i === activeInstrument);
    });
    sounds.ui.click.howl.play();
  };

  // Musical Staff ---------------------------------------------//
  const showActiveNotehead = (noteName: NoteName) => {
    // Clear existing fadeout timer, if one exists
    clearTimeout(noteFadeOut);
    // Immediately hide any visible noteheads
    hideNoteheads();

    const staffType = sounds.instruments[activeInstrument].staffType;
    const currentStaff = STAFF_TYPE_PREFIX + staffType;
    const currentNote: SVGElement | null = synth.querySelector(
      `.${currentStaff} .${NOTEHEAD_PREFIX}${noteName}`,
    );

    if (currentNote) currentNote.style.display = "block";

    // Prep a timer to fade out noteheads
    // if no other actions are taken
    noteFadeOut = setTimeout(hideNoteheads, 5000);
  };

  const hideNoteheads = () => {
    noteheads.forEach((notehead) => {
      notehead.style.display = "none";
    });
  };

  // Keyboard ----------------------------------------------------//
  const revealKeyboardLetters = () => {
    // Only show keyboard on non-touch devices
    if (!isTouchDevice) {
      keyLetters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add("visible");
        }, i * 30);
      });
    }
  };

  const hideKeyboardLetters = () => {
    if (lettersHidden) {
      return;
    }
    lettersHidden = true;
    keyLetters.forEach((letter) => {
      letter.classList.add("fadeout");
      setTimeout(() => {
        letter.classList.remove("visible");
      }, 2000);
    });
  };

  const pressKey = (noteName: NoteName) => {
    const keyId = document.getElementById(noteName);
    if (!keyId?.classList.contains("pressed")) {
      keyId?.classList.add("pressed");
      sounds.instruments[activeInstrument].howl.play(noteName);
      showActiveNotehead(noteName);
    }
  };

  const releaseKey = (noteName: NoteName) => {
    document.getElementById(noteName)?.classList.remove("pressed");
  };

  const releaseAllKeys = () => {
    keys.forEach((key) => {
      key.classList.remove("pressed");
    });
  };

  // Event Binding ---------------------------------------------//
  const handleClickStep = (delta: 1 | -1) => (e: MouseEvent) => {
    e.preventDefault();
    stepInstrument(delta);
  };

  const handleClickInstrument = (e: MouseEvent) => {
    e.preventDefault();
    setRandomInstrument();
  };

  const handlePointerStart = function (
    this: SVGElement,
    e: MouseEvent | TouchEvent,
  ) {
    e.preventDefault();
    hideKeyboardLetters();
    if (e.type === "mousedown") {
      isMouseDown = true;
    }
    pressKey(this.id as NoteName);
  };

  const handleMouseEnter = function (this: SVGElement, e: MouseEvent) {
    e.preventDefault();
    if (isMouseDown) {
      pressKey(this.id as NoteName);
    }
  };

  const handleMouseOut = function (this: SVGElement, e: MouseEvent) {
    e.preventDefault();
    releaseKey(this.id as NoteName);
  };

  const handleMouseUp = () => {
    isMouseDown = false;
    releaseAllKeys();
  };

  const isPlayable = () =>
    synth.dataset.state === "ready" && synth.matches(":focus-within");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPlayable()) {
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      hideKeyboardLetters();
      e.preventDefault();
      stepInstrument(e.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    const note = KEY_TO_NOTE[e.key.toLowerCase()];
    if (note === undefined) {
      return;
    }

    hideKeyboardLetters();
    e.preventDefault();
    pressKey(note);
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!isPlayable()) {
      return;
    }

    const note = KEY_TO_NOTE[e.key.toLowerCase()];
    if (note === undefined) {
      return;
    }

    releaseKey(note);
  };

  const bindEvents = () => {
    prevArrow?.addEventListener("click", handleClickStep(-1));
    nextArrow?.addEventListener("click", handleClickStep(1));
    synth.addEventListener("mouseup", handleMouseUp);
    synth.addEventListener("touchend", releaseAllKeys);
    keys.forEach((key) => {
      key.addEventListener("mousedown", handlePointerStart);
      key.addEventListener("mouseenter", handleMouseEnter);
      key.addEventListener("mouseout", handleMouseOut);
      key.addEventListener("touchstart", handlePointerStart);
    });
    instrumentIconWrapper?.addEventListener("click", handleClickInstrument);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  };

  enableSynth();
  bindEvents();
  unmute(Howler.ctx, false, false);
}
