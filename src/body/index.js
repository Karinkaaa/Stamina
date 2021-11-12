import React from "react";
import { Toolbar, withStyles } from "@material-ui/core";
import EntryField from "../body/EntryField";
import AppBarComponent from "../body/AppBarComponent";
import TimerComponent from "../timer";
import { text } from "../utils/text";
import { getPercentOfMistakes, getTypingSpeed } from "../utils/methods";
import {
    BUTTON_COMPLETE,
    BUTTON_RESUME,
    BUTTON_START_OVER,
    ESCAPE,
    ESCAPE_PAUSE,
    MODE_MODAL,
    MODE_PAUSE,
    MODE_PRESTART,
    MODE_PROGRESS,
    MODE_START,
    SPACE,
    SPACE_START
} from "../utils/constants";

const useStyles = ({
    root: {
        paddingTop: "8%"
    }
});

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            pause: false,
            resume: false,
            stop: false,
            reset: false,
            open: false,
            chartData: [],
            leftText: SPACE_START,
            rightText: ESCAPE_PAUSE,
            typedChars: 0,
            typedCorrectChars: 0,
            mode: MODE_PRESTART,
            prevMode: ""
        };
    }

    render() {
        const classes = this.props;
        const {
            start,
            pause,
            resume,
            stop,
            reset,
            open,
            chartData,
            leftText,
            rightText,
            typedChars,
            typedCorrectChars,
            mode,
            prevMode
        } = this.state;

        const addDataToChart = () => {
            const seconds = chartData.length;

            chartData.push(
                {
                    seconds: seconds,
                    speed: getTypingSpeed(this.state.typedCorrectChars, seconds),
                    mistakes: getPercentOfMistakes(this.state.typedChars, this.state.typedCorrectChars)
                }
            );
        };

        const resetTypedChars = () => {
            this.setState({
                typedChars: 0,
                typedCorrectChars: 0,
                chartData: []
            });
        };

        const setDataInPrestartMode = () => {
            this.setState({
                leftText: SPACE_START,
                rightText: ESCAPE_PAUSE,
                start: false,
                reset: true,
                pause: false,
                resume: false,
                stop: false
            });
            resetTypedChars();
        };

        const setDataInStartMode = () => {
            this.setState({
                leftText: "",
                rightText: text,
                start: false,
                reset: true,
                pause: false,
                resume: false,
                stop: false
            });
            resetTypedChars();
        };

        const handleClickSpaceAtStart = () => {
            this.setState({
                leftText: "",
                rightText: text
            });
        };

        const handleTypeCorrectSign = (key) => {
            this.setState({
                leftText: this.state.leftText + key,
                rightText: this.state.rightText.slice(1),
                typedChars: this.state.typedChars + 1,
                typedCorrectChars: this.state.typedCorrectChars + 1
            });
        };

        const handleTypeIncorrectSign = () => {
            this.setState({
                typedChars: this.state.typedChars + 1
            });
        };

        const handleCloseAtPrestartMode = () => {
            this.setState({
                mode: MODE_PRESTART,
                prevMode: MODE_MODAL,
                open: false
            });
        };

        const handleCloseAtStartMode = () => {
            this.setState({
                mode: MODE_START,
                prevMode: MODE_MODAL,
                open: false
            });
        };

        const handleCloseAtPauseMode = () => {
            this.setState({
                mode: MODE_PAUSE,
                prevMode: MODE_MODAL,
                open: false
            });
        };

        const handleClose = (event) => {
            keyDownProcess(event);
        };

        const handleOpenAtModalMode = () => {
            this.setState({
                mode: MODE_MODAL,
                prevMode: MODE_PAUSE,
                open: true
            });
        };

        const keyDownProcess = (event) => {
            const letter = rightText[0];
            const key = event.key;
            const code = event.code;
            const id = event.currentTarget.id;

            if (mode === MODE_PRESTART && code === SPACE) {
                this.setState({
                    mode: MODE_START,
                    prevMode: MODE_PRESTART,
                    start: false,
                    reset: true,
                    pause: false,
                    resume: false,
                    stop: false
                });
                handleClickSpaceAtStart();
            } else if (mode === MODE_PRESTART && key === ESCAPE) {
                this.setState({
                    mode: MODE_MODAL,
                    prevMode: MODE_PRESTART,
                    open: true,
                    start: false,
                    reset: true,
                    pause: false,
                    resume: false,
                    stop: false
                });
            } else if (mode === MODE_START && key === letter) {
                this.setState({
                    mode: MODE_PROGRESS,
                    prevMode: MODE_START,
                    start: true,
                    stop: false,
                    pause: false,
                    resume: false,
                    reset: false
                });
                handleTypeCorrectSign(key);
            } else if (mode === MODE_START && key === ESCAPE) {
                this.setState({
                    mode: MODE_MODAL,
                    prevMode: MODE_START,
                    open: true,
                    start: false,
                    reset: true,
                    pause: false,
                    resume: false,
                    stop: false
                });
            } else if (mode === MODE_PROGRESS && key === ESCAPE) {
                this.setState({
                    mode: MODE_MODAL,
                    prevMode: MODE_PROGRESS,
                    open: true,
                    start: false,
                    pause: true,
                    resume: false,
                    stop: false,
                    reset: false
                });
            } else if (mode === MODE_PROGRESS && key === letter) {
                handleTypeCorrectSign(key);
            } else if (mode === MODE_PROGRESS && key !== letter && event.keyCode >= 32 && event.keyCode <= 122) {
                handleTypeIncorrectSign();
            } else if (mode === MODE_PAUSE && key === ESCAPE) {
                handleOpenAtModalMode();
            } else if (mode === MODE_PAUSE && key === letter) {
                this.setState({
                    mode: MODE_PROGRESS,
                    prevMode: MODE_PAUSE,
                    start: false,
                    resume: true,
                    pause: false,
                    stop: false,
                    reset: false
                });
                handleTypeCorrectSign(key);
            } else if (mode === MODE_MODAL && id === BUTTON_COMPLETE) {
                handleCloseAtPrestartMode();
                setDataInPrestartMode();
            } else if (mode === MODE_MODAL && id === BUTTON_START_OVER) {
                handleCloseAtStartMode();
                setDataInStartMode();
            } else if (mode === MODE_MODAL && prevMode === MODE_PRESTART && key === ESCAPE) {
                handleCloseAtPrestartMode();
            } else if (mode === MODE_MODAL && prevMode === MODE_PAUSE && key === ESCAPE) {
                this.setState({
                    mode: MODE_PAUSE,
                    prevMode: MODE_MODAL,
                    open: false,
                    start: false,
                    pause: true,
                    resume: false,
                    stop: false,
                    reset: false
                });
            } else if (mode === MODE_MODAL && prevMode === MODE_START && key === ESCAPE) {
                handleCloseAtStartMode();
            } else if ((mode === MODE_MODAL && prevMode === MODE_PROGRESS && key === ESCAPE) || (mode === MODE_MODAL && id === BUTTON_RESUME)) {
                handleCloseAtPauseMode();
            }
        };

        window.onkeydown = (event) => {
            keyDownProcess(event);
        };

        return (
            <div className={classes.root}>
                <AppBarComponent/>
                <Toolbar/>

                <TimerComponent
                    start={start}
                    pause={pause}
                    resume={resume}
                    stop={stop}
                    reset={reset}
                    addDataToChart={addDataToChart}
                />

                <EntryField
                    leftText={leftText}
                    rightText={rightText}
                    typedChars={typedChars}
                    typedCorrectChars={typedCorrectChars}
                    chartData={chartData}
                    open={open}
                    onClose={handleClose}
                    handleClickButton={keyDownProcess}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(Body);