import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Modal } from "@material-ui/core";
import Chart from "../chart";
import ModalText from "./ModalText";
import { getMinutesAndSeconds, getTimeInSeconds, getTypingAccuracy, getTypingSpeed } from "../utils/methods";
import {
    ACCURACY,
    BUTTON_COMPLETE,
    BUTTON_RESUME,
    BUTTON_START_OVER,
    MAX_SECONDS,
    PERCENT_SIGN,
    SIGNS,
    SIGNS_PER_MINUTE,
    SPEED,
    TYPED_CHARS
} from "../utils/constants";

const useStyles = makeStyles({
    root: {
        background: "#3C5E9D66"
    },
    box: {
        position: "absolute",
        padding: 25,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        height: "fit-content",
        background: "rgb(24,26,27)",
        boxShadow: "0 0 10px cyan"
    },
    btn: {
        background: "whitesmoke",
        margin: 10,
        "&:hover": {
            color: "white",
            background: "#333333",
        }
    },
    bthHide: {
        visibility: (param) => param ? "hidden" : "visible"
    },
});

const ModalComponent = ({ typedChars, typedCorrectChars, chartData, open, onClose, handleClickButton }) => {
    const { minutes, seconds } = getMinutesAndSeconds(chartData.length);
    const timeInSeconds = getTimeInSeconds(minutes, seconds);
    const speed = getTypingSpeed(typedCorrectChars, timeInSeconds);
    const accuracy = getTypingAccuracy(typedChars, typedCorrectChars);

    const isHiddenBtn = MAX_SECONDS <= timeInSeconds * 1000;
    const classes = useStyles(isHiddenBtn);

    return (
        <Modal
            open={open}
            onClose={onClose}
            className={classes.root}
        >
            <Box className={classes.box}>
                <ModalText text={TYPED_CHARS} data={typedCorrectChars + SIGNS}/>
                <ModalText text={SPEED} data={speed + SIGNS_PER_MINUTE}/>
                <ModalText text={ACCURACY} data={accuracy + PERCENT_SIGN}/>

                <Chart data={chartData}/>

                <Button
                    id={BUTTON_COMPLETE}
                    className={classes.btn}
                    onClick={handleClickButton}
                >
                    {BUTTON_COMPLETE}
                </Button>

                <Button
                    id={BUTTON_START_OVER}
                    className={`${classes.btn} ${classes.bthHide}`}
                    onClick={handleClickButton}
                >
                    {BUTTON_START_OVER}
                </Button>

                <Button
                    id={BUTTON_RESUME}
                    className={`${classes.btn} ${classes.bthHide}`}
                    onClick={handleClickButton}
                    disabled={typedCorrectChars === 0}
                >
                    {BUTTON_RESUME}
                </Button>
            </Box>
        </Modal>
    );
};

ModalComponent.propTypes = {
    typedChars: PropTypes.number.isRequired,
    typedCorrectChars: PropTypes.number.isRequired,
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            seconds: PropTypes.number.isRequired,
            speed: PropTypes.number.isRequired,
            mistakes: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleClickButton: PropTypes.func.isRequired
};

export default ModalComponent;