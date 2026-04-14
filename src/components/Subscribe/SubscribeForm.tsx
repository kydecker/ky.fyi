import "./subscribe.css";

import classNames from "classnames";
import * as Fathom from "fathom-client";
import {
  type ChangeEvent,
  type SubmitEvent,
  type SubmitEventHandler,
  useEffect,
  useState,
} from "react";

import { isValidEmail } from "../../helpers/helpers";
import { Icon } from "../Icon/Icon";
import { Dialogue } from "./Dialogue/Dialogue";
import { type EmoteType, emoteData } from "./Dialogue/Emote";

interface SniperResponse {
  url: string;
  image: string;
  provider_pretty: string;
}

type RemarkType =
  | "intro"
  | "someCharacters"
  | "deleting"
  | "validEmail"
  | "submitting"
  | "success"
  | "error";

interface Remark {
  text: string[];
  emote: EmoteType;
}

const TRIGGER_SOME_CHARACTERS_DIALOGUE_AT_LENGTH = 4;
const REMARK_TIMEOUT = 1000;

const remarks: Record<RemarkType, Remark> = {
  intro: {
    text: [
      "hey bestie",
      "what’s up",
      "hey you",
      "hey nerd",
      "you found me!",
      "welcome 2 my garden ✿",
      "salutations",
      "hi~ (❛‿❛✿̶̥̥)",
      "oh hey",
      "hiiieee",
      "hello hello",
      "hey dork",
      "oh. hi",
      "bonjour",
      "good morning(??)",
      "hello stranger",
      "well hello!",
      "wassup",
    ],
    emote: "happy",
  },
  someCharacters: {
    text: [
      "typing! incredible",
      "we love to type",
      "tap tap tap",
      "typing is fun",
      "you type so good",
      "clicky clack",
      "type type type",
      "click clack",
      "tap tap",
      "type type",
    ],
    emote: "happy",
  },
  deleting: {
    text: [
      "deletinggg",
      "goodbye",
      "clear that box",
      "sometimes people make mistakes",
      "it’s ok to go back",
      "DELETE",
      "D E S T R O Y",
      "the feminine urge to destroy",
      "ᕙ(`▿´)ᕗ",
      "lol bye",
      "yes. that can go",
    ],
    emote: "flushed",
  },
  validEmail: {
    text: [
      "nice email",
      "that’s a good email",
      "yup. that’s an email",
      "what a good email",
      "mmm… electronic mail",
      "nice address you have there",
      "congrats! it’s an email",
      "looks like an email",
      "i can’t believe it’s email",
      "email! email! email!",
    ],
    emote: "playful",
  },
  submitting: {
    text: [
      "taking off…",
      "subscribing…",
      "connecting wires…",
      "reticulating splines…",
      "plugging in…",
      "counting down…",
      "dialing up…",
    ],
    emote: "thinking",
  },
  success: {
    text: ["yeah! get ready for e-mail (eva-mail)"],
    emote: "starstruck",
  },
  error: {
    text: [
      "computer says no",
      "that didn’t work",
      "it broke. idk",
      "everything fell apart",
      "try again?",
      "oh no. computers",
      "hm.. it broke. dang",
      "that didn’t work. hm",
      "something went wrong",
    ],
    emote: "sob",
  },
};

const getRandomRemark = (remarks: string[]): string => {
  return remarks[Math.floor(Math.random() * remarks.length)];
};

export const SubscribeForm = () => {
  const [currentRemarkType, setCurrentRemarkType] = useState<RemarkType | null>(
    null,
  );
  const [justDisplayedRemarks, setJustDisplayedRemarks] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState<string>("");

  const [currentText, setCurrentText] = useState<string | null>("");
  const [currentEmote, setCurrentEmote] = useState<EmoteType>("neutral");

  const [isHoveringOrFocusingSubscribe, setIsHoveringOrFocusingSubscribe] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sniperData, setSniperData] = useState<SniperResponse | null>(null);

  const displayNewRemark = (
    remarkType: RemarkType,
    options?: { force?: boolean },
  ) => {
    const shouldDisplayNewRemark =
      options?.force === true || !justDisplayedRemarks;

    if (shouldDisplayNewRemark && remarkType !== currentRemarkType) {
      setCurrentRemarkType(remarkType);
      setCurrentText(getRandomRemark(remarks[remarkType].text));
      setCurrentEmote(remarks[remarkType].emote);
    }
  };

  useEffect(() => {
    if (currentRemarkType) {
      setJustDisplayedRemarks(true);
      setTimeout(() => {
        setJustDisplayedRemarks(false);
      }, REMARK_TIMEOUT);
    }
  }, [currentRemarkType]);

  const handleFocus = () => {
    if (currentRemarkType === null) {
      displayNewRemark("intro");
    }
  };

  const handleBlur = () => {
    setCurrentEmote("neutral");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRecipientEmail(value);

    if (isValidEmail(value)) {
      displayNewRemark("validEmail", { force: true });
    }

    if (
      value.length === TRIGGER_SOME_CHARACTERS_DIALOGUE_AT_LENGTH &&
      value.length > recipientEmail.length
    ) {
      displayNewRemark("someCharacters");
    }

    if (value.length < recipientEmail.length) {
      displayNewRemark("deleting");
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (
    e: SubmitEvent,
  ) => {
    e.preventDefault();

    setIsSubmitting(true);
    displayNewRemark("submitting", { force: true });

    const url =
      "https://buttondown.email/api/emails/embed-subscribe/notesfromeva";
    const data = new FormData(e.target as HTMLFormElement);

    fetch(url, { method: "POST", body: data })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            displayNewRemark("success", { force: true });
            setHasSubmitted(true);
            setIsSubmitting(false);
          }, 1500);
        } else {
          console.error(response);
          displayNewRemark("error", { force: true });
          setIsSubmitting(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const sender = "hi@ky.fyi";
    const sniperUrl = `https://sniperl.ink/v1/render?recipient=${recipientEmail}&sender=${sender}`;

    fetch(sniperUrl)
      .then(async (response) => {
        if (response.ok) {
          await response.json().then((data) => {
            setSniperData(data);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmoteClick = () => {
    const emoteKeys = Object.keys(emoteData) as EmoteType[];
    const currentEmoteIndex = emoteKeys.indexOf(currentEmote);
    const nextEmote = emoteKeys[currentEmoteIndex + 1] || emoteKeys[0];
    setCurrentEmote(nextEmote);
    setCurrentText("");
    setCurrentRemarkType(null);

    Fathom.trackEvent("subscribe: click stamp");
  };

  return (
    <div className="subscribe">
      <div className="subscribe-content">
        <div className="subscribe-header">
          <div>
            <h2>Subscribe</h2>
            <p>Emails about design, web dev, and life. A few times a year.</p>
          </div>
        </div>
        <Dialogue
          text={currentText}
          emote={currentEmote}
          onEmoteClick={handleEmoteClick}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {!hasSubmitted ? (
          <div
            className="inputWrapper"
            aria-disabled={isSubmitting || hasSubmitted}
          >
            <input
              aria-label="Your email"
              className="input"
              autoComplete="email"
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={recipientEmail}
              disabled={isSubmitting || hasSubmitted}
            />
            <button
              type="submit"
              className={classNames("iconButton", {
                loading: isSubmitting,
              })}
              disabled={isSubmitting || hasSubmitted}
              aria-label="Subscribe"
              onFocus={() => {
                setIsHoveringOrFocusingSubscribe(true);
              }}
              onBlur={() => {
                setIsHoveringOrFocusingSubscribe(false);
              }}
              onMouseOver={() => {
                setIsHoveringOrFocusingSubscribe(true);
              }}
              onMouseLeave={() => {
                setIsHoveringOrFocusingSubscribe(false);
              }}
            >
              <Icon
                icon={isSubmitting ? "loader" : "mailAdd"}
                variant={isHoveringOrFocusingSubscribe ? "filled" : "line"}
              />
            </button>
          </div>
        ) : sniperData ? (
          <a
            href={sniperData.url}
            className="sniperLink"
            target="_blank"
            rel="noreferrer"
          >
            <div className="sniperLogo">
              <img src={sniperData.image} alt={sniperData.provider_pretty} />
            </div>
            Open {sniperData.provider_pretty}
            <Icon icon="arrowRight" />
          </a>
        ) : (
          <div className="checkInbox">Check your inbox</div>
        )}
      </form>
    </div>
  );
};
