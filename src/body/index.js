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
    MAX_SECONDS,
    MILLISECONDS_IN_SECOND,
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

    addDataToChart = () => {
        const seconds = this.state.chartData.length;

        this.state.chartData.push({
            seconds,
            speed: getTypingSpeed(this.state.typedCorrectChars, seconds),
            mistakes: getPercentOfMistakes(this.state.typedChars, this.state.typedCorrectChars)
        });
    };

    resetTypedChars = () => {
        this.setState({
            typedChars: 0,
            typedCorrectChars: 0,
            chartData: []
        });
    };

    setDataInPrestartMode = () => {
        this.setState({
            leftText: SPACE_START,
            rightText: ESCAPE_PAUSE,
            start: false,
            reset: true,
            pause: false,
            resume: false,
            stop: false
        });
        this.resetTypedChars();
    };

    setDataInStartMode = () => {
        this.setState({
            leftText: "",
            rightText: text,
            start: false,
            reset: true,
            pause: false,
            resume: false,
            stop: false
        });
        this.resetTypedChars();
    };

    handleClickSpaceAtStart = () => {
        this.setState({
            leftText: "",
            rightText: text
        });
    };

    handleTypeCorrectSign = (key) => {
        this.setState({
            leftText: this.state.leftText + key,
            rightText: this.state.rightText.slice(1),
            typedChars: this.state.typedChars + 1,
            typedCorrectChars: this.state.typedCorrectChars + 1
        });
    };

    handleTypeIncorrectSign = () => {
        this.setState({
            typedChars: this.state.typedChars + 1
        });
    };

    handleCloseAtPrestartMode = () => {
        this.setState({
            mode: MODE_PRESTART,
            prevMode: MODE_MODAL,
            open: false
        });
    };

    handleCloseAtStartMode = () => {
        this.setState({
            mode: MODE_START,
            prevMode: MODE_MODAL,
            open: false
        });
    };

    handleCloseAtPauseMode = () => {
        this.setState({
            mode: MODE_PAUSE,
            prevMode: MODE_MODAL,
            open: false
        });
    };

    handleOpenAtModalMode = () => {
        this.setState({
            mode: MODE_MODAL,
            prevMode: MODE_PAUSE,
            open: true
        });
    };

    keyDownProcess = (event) => {
        const letter = this.state.rightText[0];
        const key = event.key;
        const code = event.code;
        const id = event.currentTarget.id;
        const seconds = this.state.chartData.length;

        if (this.state.mode === MODE_PRESTART && code === SPACE) {
            this.setState({
                mode: MODE_START,
                prevMode: MODE_PRESTART,
                start: false,
                reset: true,
                pause: false,
                resume: false,
                stop: false
            });
            this.handleClickSpaceAtStart();
        } else if (key === ESCAPE && (this.state.mode === MODE_START || this.state.mode === MODE_PRESTART)) {
            this.setState({
                mode: MODE_PRESTART
            });
            this.setDataInPrestartMode();
        } else if (this.state.mode === MODE_START && key === letter) {
            this.setState({
                mode: MODE_PROGRESS,
                prevMode: MODE_START,
                start: true,
                stop: false,
                pause: false,
                resume: false,
                reset: false
            });
            this.handleTypeCorrectSign(key);
        } else if (this.state.mode === MODE_START && key === ESCAPE) {
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
        } else if (this.state.mode === MODE_PROGRESS && key === ESCAPE && seconds > 1) {
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
        } else if (this.state.mode === MODE_PROGRESS && key === letter) {
            this.handleTypeCorrectSign(key);
        } else if (this.state.mode === MODE_PROGRESS && key !== letter && event.keyCode >= 32 && event.keyCode <= 122) {
            this.handleTypeIncorrectSign();
        } else if (this.state.mode === MODE_PAUSE && key === ESCAPE) {
            this.handleOpenAtModalMode();
        } else if (this.state.mode === MODE_PAUSE && key === letter) {
            this.setState({
                mode: MODE_PROGRESS,
                prevMode: MODE_PAUSE,
                start: false,
                resume: true,
                pause: false,
                stop: false,
                reset: false
            });
            this.handleTypeCorrectSign(key);
        } else if (this.state.mode === MODE_MODAL && key === ESCAPE && seconds >= MAX_SECONDS / MILLISECONDS_IN_SECOND) {
            event.preventDefault();
        } else if (this.state.mode === MODE_MODAL && id === BUTTON_COMPLETE) {
            this.handleCloseAtPrestartMode();
            this.setDataInPrestartMode();
        } else if (this.state.mode === MODE_MODAL && id === BUTTON_START_OVER) {
            this.handleCloseAtStartMode();
            this.setDataInStartMode();
        } else if (this.state.mode === MODE_MODAL && this.state.prevMode === MODE_PRESTART && key === ESCAPE) {
            this.handleCloseAtPrestartMode();
        } else if (this.state.mode === MODE_MODAL && this.state.prevMode === MODE_PAUSE && key === ESCAPE) {
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
        } else if (this.state.mode === MODE_MODAL && this.state.prevMode === MODE_START && key === ESCAPE) {
            this.handleCloseAtStartMode();
        } else if ((this.state.mode === MODE_MODAL &&this.state.prevMode === MODE_PROGRESS && key === ESCAPE) || (this.state.mode === MODE_MODAL && id === BUTTON_RESUME)) {
            this.handleCloseAtPauseMode();
        }
    };

    handleClose = (event) => {
        this.keyDownProcess(event);
    };

    autoStop = () => {
        this.keyDownProcess({ 
            key: ESCAPE,  
            currentTarget: {}
        });
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
        } = this.state;

        window.onkeydown = (event) => {
            this.keyDownProcess(event);
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
                    addDataToChart={this.addDataToChart}
                    autoStop={this.autoStop}
                />

                <EntryField
                    leftText={leftText}
                    rightText={rightText}
                    typedChars={typedChars}
                    typedCorrectChars={typedCorrectChars}
                    chartData={chartData}
                    open={open}
                    onClose={this.handleClose}
                    handleClickButton={this.keyDownProcess}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(Body);