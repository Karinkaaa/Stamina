import { getMinutesAndSeconds, getMinutesInStringFormat, getSecondsInStringFormat } from "../utils/methods";
import { TIMER_STATE_IDLE, TIMER_STATE_START, TIMER_STATE_STOP } from "../utils/constants";

class Timer {
    constructor(cb) {
        this.begin = null;
        this.end = null;
        this.cb = cb;
        this.state = TIMER_STATE_IDLE;
    }

    start() {
        console.log("- start", this.state);
        if (this.state === TIMER_STATE_IDLE) {
            console.log("start IF");
            this.state = TIMER_STATE_START;
            this.begin = Date.now();
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                if (this.state === TIMER_STATE_START) {
                    this.cb()
                }
            }, 1000);
        }
    }

    stop() {
        console.log("- stop", this.state);
        if (this.state === TIMER_STATE_START) {
            console.log("stop IF");
            this.state = TIMER_STATE_STOP;
            this.end = Date.now();
            // clearInterval(this.interval);
        }
    }

    reset() {
        console.log("reset", this.state);
        this.state = TIMER_STATE_IDLE;
        this.begin = null;
        this.end = null;
        // clearInterval(this.interval);
    }

    resume() {
        console.log("- resume", this.state);
        if (this.state === TIMER_STATE_STOP || this.state === TIMER_STATE_IDLE) {
            console.log("resume IF");
            this.state = TIMER_STATE_START;
            this.begin = Date.now() - this.getTime();
            this.end = null;
            // this.interval = setInterval(() => this.cb(), 1000);
        }
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
        return this.state === TIMER_STATE_START;
    }
}

export default Timer;