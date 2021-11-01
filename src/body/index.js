import React, { useState } from "react";
import { Container, makeStyles, Toolbar } from "@material-ui/core";
import AppBarComponent from "./AppBarComponent";
import EntryField from "./EntryField";
import TimerView from "../timerView";
import Timer from "../timerView/Timer";
import { text } from "../utils/text";
import { getPercentOfMistakes, getTypingSpeed } from "../utils/methods";
import {
    BUTTON_COMPLETE,
    BUTTON_RESUME,
    BUTTON_START_OVER,
    ESCAPE,
    ESCAPE_PAUSE,
    MIDNIGHT_TIME,
    MODE_MODAL,
    MODE_PAUSE,
    MODE_PRESTART,
    MODE_PROGRESS,
    MODE_START,
    SPACE,
    SPACE_START
} from "../utils/constants";

const useStyles = makeStyles({
    root: {
        paddingTop: "8%"
    },
    timer: {
        inlineSize: "fit-content"
    }
});

const timer = new Timer();

const Body = () => {
    const classes = useStyles();

    const [time, setTime] = useState(MIDNIGHT_TIME);
    const [open, setOpen] = useState(false);
    const [chartData, setChartData] = useState([]);

    const [leftText, setLeftText] = useState(SPACE_START);
    const [rightText, setRightText] = useState(ESCAPE_PAUSE);
    const [typedChars, setTypedChars] = useState(0);
    const [typedCorrectChars, setTypedCorrectChars] = useState(0);

    const [mode, setMode] = useState(MODE_PRESTART);
    const [prevMode, setPrevMode] = useState("");

    timer.cb = () => {
        const seconds = timer.getSeconds();
        setTime(timer.getFormattedTime());

        chartData.push(
            {
                seconds: seconds,
                speed: getTypingSpeed(typedCorrectChars, seconds),
                mistakes: getPercentOfMistakes(typedChars, typedCorrectChars)
            }
        );
    };

    const resetTypedChars = () => {
        setTypedChars(0);
        setTypedCorrectChars(0);
        setChartData([]);
    };

    const setDataInPrestartMode = () => {
        timer.reset();
        setTime(MIDNIGHT_TIME);
        setLeftText(SPACE_START);
        setRightText(ESCAPE_PAUSE);
        resetTypedChars();
    };

    const setDataInStartMode = () => {
        timer.reset();
        setTime(MIDNIGHT_TIME);
        setLeftText("");
        setRightText(text);
        resetTypedChars();
    };

    const handleClickSpaceAtStart = () => {
        setLeftText("");
        setRightText(text);
    };

    const handleTypeCorrectSign = (key) => {
        setLeftText(leftText + key);
        setRightText(rightText.slice(1));
        setTypedChars(typedChars + 1);
        setTypedCorrectChars(typedCorrectChars + 1);
    };

    const handleClose = (event) => {
        keyDownProcess(event);
    };

    const keyDownProcess = (event) => {
        const letter = rightText[0];
        const key = event.key;
        const code = event.code;
        const id = event.currentTarget.id;

        if (mode === MODE_PRESTART && code === SPACE) {
            setMode(MODE_START);
            setPrevMode(MODE_PRESTART);
            timer.reset();
            handleClickSpaceAtStart();
        } else if (mode === MODE_PRESTART && key === ESCAPE) {
            setMode(MODE_MODAL);
            setPrevMode(MODE_PRESTART);
            timer.reset();
            setOpen(true);
        } else if (mode === MODE_START && key === letter) {
            setMode(MODE_PROGRESS);
            setPrevMode(MODE_START);
            timer.start();
            handleTypeCorrectSign(key);
        } else if (mode === MODE_START && key === ESCAPE) {
            setMode(MODE_MODAL);
            setPrevMode(MODE_START);
            timer.reset();
            setOpen(true);
        } else if (mode === MODE_PROGRESS && key === ESCAPE) {
            setMode(MODE_MODAL);
            setPrevMode(MODE_PROGRESS);
            timer.stop();
            setOpen(true);
        } else if (mode === MODE_PROGRESS && key === letter) {
            handleTypeCorrectSign(key);
        } else if (mode === MODE_PAUSE && key === ESCAPE) {
            setMode(MODE_MODAL);
            setPrevMode(MODE_PAUSE);
            setOpen(true);
        } else if (mode === MODE_PAUSE && key === letter) {
            setMode(MODE_PROGRESS);
            setPrevMode(MODE_PAUSE);
            timer.resume();
            handleTypeCorrectSign(key);
        } else if (mode === MODE_MODAL && id === BUTTON_COMPLETE) {
            setMode(MODE_PRESTART);
            setPrevMode(MODE_MODAL);
            setOpen(false);
            setDataInPrestartMode();
        } else if (mode === MODE_MODAL && id === BUTTON_START_OVER) {
            setMode(MODE_START);
            setPrevMode(MODE_MODAL);
            setOpen(false);
            setDataInStartMode();
        } else if (mode === MODE_MODAL && prevMode === MODE_PRESTART && key === ESCAPE) {
            setMode(MODE_PRESTART);
            setPrevMode(MODE_MODAL);
            setOpen(false);
        } else if (mode === MODE_MODAL && prevMode === MODE_PAUSE && key === ESCAPE) {
            setMode(MODE_PAUSE);
            setPrevMode(MODE_MODAL);
            setOpen(false);
        } else if (mode === MODE_MODAL && prevMode === MODE_START && key === ESCAPE) {
            setMode(MODE_START);
            setPrevMode(MODE_MODAL);
            setOpen(false);
        } else if ((mode === MODE_MODAL && prevMode === MODE_PROGRESS && key === ESCAPE) || (mode === MODE_MODAL && id === BUTTON_RESUME)) {
            setMode(MODE_PAUSE);
            setPrevMode(MODE_MODAL);
            setOpen(false);
        }
    };

    window.onkeydown = (event) => {
        keyDownProcess(event);
    };

    return (
        <div className={classes.root}>
            <AppBarComponent/>
            <Toolbar/>

            <Container className={classes.timer}>
                <TimerView time={time}/>
            </Container>

            <EntryField
                leftText={leftText}
                rightText={rightText}
                typedChars={typedChars}
                typedCorrectChars={typedCorrectChars}
                timer={timer}
                chartData={chartData}
                open={open}
                onClose={handleClose}
                handleClickButton={keyDownProcess}
            />
        </div>
    );
};

export default Body;