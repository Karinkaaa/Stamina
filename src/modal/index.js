import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Modal } from "@material-ui/core";
import Chart from "../chart";
import ModalText from "./ModalText";
import { getMinutesAndSeconds, getTimeInSeconds, getTypingAccuracy, getTypingSpeed } from "../utils/methods";
import { ACCURACY, PERCENT_SIGN, SIGNS, SIGNS_PER_MINUTE, SPEED, TYPED_CHARS } from "../utils/constants";

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
        background: "#181A1BFF",
        boxShadow: "0 0 10px cyan"
    },
    btn: {
        background: "whitesmoke",
        margin: 10
    }
});

const ModalComponent = ({
                            typedChars, typedCorrectChars, timer, chartData, open,
                            onClose, handleClickComplete, handleClickStartOver, handleClickResume
                        }) => {
    const classes = useStyles();

    const { minutes, seconds } = getMinutesAndSeconds(timer.getSeconds());
    const timeInSeconds = getTimeInSeconds(minutes, seconds);
    const speed = getTypingSpeed(typedCorrectChars, timeInSeconds);
    const accuracy = getTypingAccuracy(typedChars, typedCorrectChars);

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
                    className={classes.btn}
                    onClick={() => handleClickComplete()}
                >
                    Complete
                </Button>

                <Button
                    className={classes.btn}
                    onClick={() => handleClickStartOver()}
                >
                    Start over
                </Button>

                <Button
                    className={classes.btn}
                    onClick={() => handleClickResume()}
                >
                    Resume
                </Button>
            </Box>
        </Modal>
    );
};

ModalComponent.propTypes = {
    typedChars: PropTypes.number.isRequired,
    typedCorrectChars: PropTypes.number.isRequired,
    timer: PropTypes.object.isRequired,
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            seconds: PropTypes.number.isRequired,
            speed: PropTypes.number.isRequired,
            mistakes: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    handleClickComplete: PropTypes.func.isRequired,
    handleClickStartOver: PropTypes.func.isRequired,
    handleClickResume: PropTypes.func.isRequired
};

export default ModalComponent;