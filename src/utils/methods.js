export const getMinutesAndSeconds = (seconds) => {
    return {
        minutes: Math.floor(seconds % 3600 / 60),
        seconds: Math.floor(seconds % 3600 % 60)
    };
};

export const getTimeInSeconds = (minutes, seconds) => {
    return (minutes * 60) + seconds;
};

export const getTypingSpeed = (typedCorrectChars, seconds) => {
    return (seconds <= 0) ? 0 : Math.floor((typedCorrectChars / seconds) * 60);
};

export const getPercentOfMistakes = (typedChars, typedCorrectChars) => {
    const a = typedChars;
    const b = typedCorrectChars;

    if (b === 0) {
        return 0;
    } else if (a > b) {
        return Math.round(((a - b) / a) * 100);
    } else {
        return Math.round(((b - a) / a) * 100);
    }
};

export const getTypingAccuracy = (typedChars, typedCorrectChars) => {
    if (typedChars === 0) return 0;

    const accuracy = 100 - getPercentOfMistakes(typedChars, typedCorrectChars);
    return Math.trunc(accuracy) - accuracy === 0 ? Math.trunc(accuracy) : accuracy;
};

export const getMinutesInStringFormat = (minutes) => {
    return minutes > 0 ? (minutes < 10 ? "0" + minutes : minutes) : "00";
};

export const getSecondsInStringFormat = (seconds) => {
    return seconds > 0 ? (seconds < 10 ? "0" + seconds : seconds) : "00";
};