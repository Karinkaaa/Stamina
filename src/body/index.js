import React, { useState } from "react";
import { Container, makeStyles, Toolbar } from "@material-ui/core";
import AppBarComponent from "./AppBarComponent";
import EntryField from "./EntryField";
import TimerView from "../timerView";
import Timer from "../timerView/Timer";
import { text } from "../utils/text";
import { ESCAPE, ESCAPE_PAUSE, MIDNIGHT_TIME, SPACE, SPACE_START } from "../utils/constants";
import { getPercentOfMistakes, getTypingSpeed } from "../utils/methods";

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

    const [open, setOpen] = useState(false);
    const [start, setStart] = useState(false);
    const [leftText, setLeftText] = useState(SPACE_START);
    const [rightText, setRightText] = useState(ESCAPE_PAUSE);
    const [typedChars, setTypedChars] = useState(0);
    const [typedCorrectChars, setTypedCorrectChars] = useState(0);
    const [time, setTime] = useState(MIDNIGHT_TIME);
    const [chartData, setCharData] = useState([]);

    timer.cb = () => {
        const seconds = timer.getSeconds();
        setTime(timer.getFormattedTime());
        console.log("tick");
        chartData.push(
            {
                seconds: seconds,
                speed: getTypingSpeed(typedCorrectChars, seconds),
                mistakes: getPercentOfMistakes(typedChars, typedCorrectChars)
            }
        );
    };

    const handleOpen = () => {
        timer.stop();
        setOpen(true);
    };

    const handleClickSpaceAtStart = () => {
        setLeftText("");
        setRightText(text);
        setStart(true);
        timer.reset();
    };

    const handleTypeCorrectSign = (key) => {
        setLeftText(leftText + key);
        setRightText(rightText.slice(1));
        setTypedChars(typedChars + 1);
        setTypedCorrectChars(typedCorrectChars + 1);
    };

    const handleClickComplete = () => {
        timer.reset();
        setLeftText(SPACE_START);
        setRightText(ESCAPE_PAUSE);
        setTime(MIDNIGHT_TIME);
        setTypedChars(0);
        setTypedCorrectChars(0);
        setCharData([]);
        setStart(false);
        setOpen(false);
    };

    const handleClickStartOver = () => {
        timer.reset();
        setLeftText("");
        setRightText(text);
        setTime(MIDNIGHT_TIME);
        setTypedChars(0);
        setTypedCorrectChars(0);
        setCharData([]);
        setOpen(false);
    };

    const handleClickResume = () => {
        setOpen(false);
    };

    window.onkeydown = (event) => {
        let key = event.key;
        let letter = rightText[0];
        console.log(start);

        if (!open) {
            if (start) {
                if (leftText !== SPACE_START && key === ESCAPE) {
                    console.log("1");
                    handleOpen();
                    setStart(false);
                } else if (leftText === "" && key === letter) {
                    console.log("2");
                    timer.start();
                    handleTypeCorrectSign(key);
                } else if (key === letter) {
                    console.log("3");
                    handleTypeCorrectSign(key);
                } else if (timer.isStarted() && event.keyCode >= 32 && event.keyCode <= 122) {
                    console.log("4");
                    setTypedChars(typedChars + 1);
                }
            } else {
                if (key === ESCAPE) {
                    console.log("5");
                    handleOpen();
                } else if (leftText === SPACE_START && rightText === ESCAPE_PAUSE && event.code === SPACE) {
                    console.log("6");
                    handleClickSpaceAtStart();
                } else if (key === letter) {
                    console.log("7");
                    handleTypeCorrectSign(key);
                    setStart(true);
                    timer.resume();
                }
            }
        }
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
                onClose={handleClickResume}
                handleClickComplete={handleClickComplete}
                handleClickStartOver={handleClickStartOver}
                handleClickResume={handleClickResume}
            />
        </div>
    );
};

export default Body;