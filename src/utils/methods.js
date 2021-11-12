import { ONE_HOUR_IN_SECONDS, ONE_HUNDRED_PERCENT, ONE_MINUTE_IN_SECONDS } from "./constants";

export const getMinutesAndSeconds = (seconds) => {
    return {
        minutes: Math.floor(seconds % ONE_HOUR_IN_SECONDS / ONE_MINUTE_IN_SECONDS),
        seconds: Math.floor(seconds % ONE_HOUR_IN_SECONDS % ONE_MINUTE_IN_SECONDS)
    };
};

export const getTimeInSeconds = (minutes, seconds) => {
    return (minutes * ONE_MINUTE_IN_SECONDS) + seconds;
};

export const getTypingSpeed = (typedCorrectChars, seconds) => {
    return (seconds <= 0) ? 0 : Math.floor((typedCorrectChars / seconds) * ONE_MINUTE_IN_SECONDS);
};

export const getPercentOfMistakes = (typedChars, typedCorrectChars) => {
    const a = typedChars;
    const b = typedCorrectChars;

    if (b === 0) {
        return 0;
    } else if (a > b) {
        return Math.round(((a - b) / a) * ONE_HUNDRED_PERCENT);
    } else {
        return Math.round(((b - a) / a) * ONE_HUNDRED_PERCENT);
    }
};

export const getTypingAccuracy = (typedChars, typedCorrectChars) => {
    if (typedChars === 0) return 0;

    const accuracy = ONE_HUNDRED_PERCENT - getPercentOfMistakes(typedChars, typedCorrectChars);
    return Math.trunc(accuracy) - accuracy === 0 ? Math.trunc(accuracy) : accuracy;
};

export const getTimeUnitInStringFormat = (unit) => {
    return `${unit < 10 ? `0${unit}` : unit}`;
};