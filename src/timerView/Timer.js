import { getMinutesAndSeconds, getMinutesInStringFormat, getSecondsInStringFormat } from "../utils/methods";

class Timer {
    constructor(cb) {
        this.begin = null;
        this.end = null;
        this.cb = cb;
    }

    start() {
        if (this.begin) return;
        console.log("start");
        this.begin = Date.now();
        this.interval = setInterval(() => this.cb(), 1000);
    }

    stop() {
        if (this.end) return;
        console.log("stop");
        this.end = Date.now();
        clearInterval(this.interval);
    }

    reset() {
        console.log("reset");
        this.begin = null;
        this.end = null;
        clearInterval(this.interval);
    }

    resume() {
        this.begin = Date.now() - this.getTime();
        this.end = null;
        this.interval = setInterval(() => this.cb(), 1000);
    }

    getTime() {
        const dateNow = Date.now();
        return (this.end || dateNow) - (this.begin || dateNow);
    }

    getSeconds() {
        return Math.trunc(this.getTime() / 1000);
    }

    getFormattedTime() {
        const { minutes, seconds } = getMinutesAndSeconds(this.getSeconds());
        const stringMinutes = getMinutesInStringFormat(minutes);
        const stringSeconds = getSecondsInStringFormat(seconds);

        return stringMinutes + " : " + stringSeconds;
    };

    isStarted() {
        return !!this.begin;
    }
}

export default Timer;