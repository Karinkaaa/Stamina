import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import ModalComponent from "../modal";

const useStyles = makeStyles({
    root: {
        display: "flex",
        padding: "3%",
        marginTop: "3%"
    },
    left: {
        padding: "15px 0 15px 15px",
        background: "#E3E6E9",
        color: "#CBC9CD",
        border: "solid #99B4D1",
        borderWidth: "5px 0 5px 5px",
        borderRadius: "26px 0 0 26px",
        textAlign: "right",
        float: "left",
        width: "50%",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    right: {
        padding: "15px 15px 15px 0",
        background: "#FFFFFF",
        color: "#333333",
        border: "solid #99B4D1",
        borderWidth: "5px 5px 5px 0",
        borderRadius: "0 26px 26px 0",
        float: "right",
        width: "50%",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    pre: {
        fontSize: 50,
        margin: "8px 0"
    }
});

const EntryField = ({
                        leftText, rightText, typedChars, typedCorrectChars, timer, open, chartData,
                        onClose, handleClickComplete, handleClickStartOver, handleClickResume
                    }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <pre style={{ float: "right" }} className={classes.pre}>
                    {leftText}
                </pre>
            </div>

            <div className={classes.right}>
                <pre className={classes.pre}>
                    {rightText}
                </pre>
            </div>

            <ModalComponent
                typedChars={typedChars}
                typedCorrectChars={typedCorrectChars}
                timer={timer}
                chartData={chartData}
                open={open}
                onClose={onClose}
                handleClickComplete={handleClickComplete}
                handleClickStartOver={handleClickStartOver}
                handleClickResume={handleClickResume}
            />
        </div>
    );
};

EntryField.propTypes = {
    leftText: PropTypes.string.isRequired,
    rightText: PropTypes.string.isRequired,
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

export default EntryField;