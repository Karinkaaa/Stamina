import React from "react";
import Timer from "react-compound-timer";
import { Container, Typography, withStyles } from "@material-ui/core";
import { getTimeUnitInStringFormat } from "../utils/methods";
import { MAX_SECONDS } from "../utils/constants";

const useStyles = () => ({
    root: {
        paddingTop: "8%",
        inlineSize: "fit-content"
    },
    typo: {
        textAlign: "center",
        background: "#FFFFFF",
        color: "#333333",
        border: "3px solid #99B4D1",
        borderRadius: 20,
        width: 100,
        padding: 10,
        fontSize: 20
    }
});

class TimerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.timerStartButton = React.createRef();
        this.timerStopButton = React.createRef();
        this.timerPauseButton = React.createRef();
        this.timerResumeButton = React.createRef();
        this.timerResetButton = React.createRef();
    }

    startTimer(start) {
        start();
    }

    stopTimer(stop) {
        stop();
    }

    pauseTimer(pause) {
        pause();
    }

    resumeTimer(resume) {
        resume();
    }

    resetTimer(reset) {
        reset();
    }

    componentDidUpdate(prevProps) {
        const stopIsTrue = prevProps.start === false && prevProps.pause === false && prevProps.resume === false &&
            prevProps.stop === true && prevProps.reset === false;

        const resetIsTrue = prevProps.start === false && prevProps.pause === false && prevProps.resume === false &&
            prevProps.stop === false && prevProps.reset === true;

        const startIsTrue = prevProps.start === true && prevProps.pause === false && prevProps.resume === false &&
            prevProps.stop === false && prevProps.reset === false;

        const resumeIsTrue = prevProps.start === false && prevProps.pause === false && prevProps.resume === true &&
            prevProps.stop === false && prevProps.reset === false;

        const pauseIsTrue = prevProps.start === false && prevProps.pause === true && prevProps.resume === false &&
            prevProps.stop === false && prevProps.reset === false;

        if ((stopIsTrue || resetIsTrue) && this.props.start === true) {
            this.timerStartButton.current.click();
        }
        if ((startIsTrue || pauseIsTrue || resumeIsTrue) && this.props.stop === true) {
            this.timerStopButton.current.click();
        }
        if ((startIsTrue || resumeIsTrue) && this.props.pause === true) {
            this.timerPauseButton.current.click();
        }
        if (pauseIsTrue && this.props.resume === true) {
            this.timerResumeButton.current.click();
        }
        if ((startIsTrue || pauseIsTrue || resumeIsTrue) && this.props.reset === true) {
            this.timerResetButton.current.click();
        }
    }

    render() {
        const { addDataToChart, classes } = this.props;

        return (
            <Timer
                initialTime={0}
                formatValue={value => getTimeUnitInStringFormat(value)}
                startImmediately={false}
                checkpoints={new Array(MAX_SECONDS).fill(0).map((v, i) => (
                    {
                        time: i * 1000,
                        callback: addDataToChart
                    }
                ))}
            >
                {
                    ({ start, resume, pause, stop, reset }) => (
                        <React.Fragment>
                            <Container className={classes.root}>
                                <Typography className={classes.typo}>
                                    <Timer.Minutes/> : <Timer.Seconds/>
                                </Typography>
                            </Container>

                            <div>
                                <button hidden ref={this.timerStartButton} onClick={() => this.startTimer(start)}>
                                    Start
                                </button>

                                <button hidden ref={this.timerPauseButton} onClick={() => this.pauseTimer(pause)}>
                                    Pause
                                </button>

                                <button hidden ref={this.timerResumeButton} onClick={() => this.resumeTimer(resume)}>
                                    Resume
                                </button>

                                <button hidden ref={this.timerStopButton} onClick={() => this.stopTimer(stop)}>
                                    Stop
                                </button>

                                <button hidden ref={this.timerResetButton} onClick={() => this.resetTimer(reset)}>
                                    Reset
                                </button>
                            </div>
                        </React.Fragment>
                    )
                }
            </Timer>
        );
    }
}

export default withStyles(useStyles)(TimerComponent);