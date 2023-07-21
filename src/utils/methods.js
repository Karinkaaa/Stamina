import { SECONDS_IN_HOUR, ONE_HUNDRED_PERCENT, SECONDS_IN_MINUTE } from "./constants";

export const getMinutesAndSeconds = (seconds) => {
    return {
        minutes: Math.floor(seconds % SECONDS_IN_HOUR / SECONDS_IN_MINUTE),
        seconds: Math.floor(seconds % SECONDS_IN_HOUR % SECONDS_IN_MINUTE)
    };
};

export const getTimeInSeconds = (minutes, seconds) => {
    return (minutes * SECONDS_IN_MINUTE) + seconds;
};

export const getTypingSpeed = (typedCorrectChars, seconds) => {
    return (seconds <= 0) ? 0 : Math.floor((typedCorrectChars / seconds) * SECONDS_IN_MINUTE);
};

export const getPercentOfMistakes = (typedChars, typedCorrectChars) => {
    if (typedCorrectChars === 0) {
        return 0;
    } else if (typedChars > typedCorrectChars) {
        return Math.round(((typedChars - typedCorrectChars) / typedChars) * ONE_HUNDRED_PERCENT);
    } else {
        return Math.round(((typedCorrectChars - typedChars) / typedChars) * ONE_HUNDRED_PERCENT);
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