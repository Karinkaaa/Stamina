import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        color: "#000000",
        background: "linear-gradient(whitesmoke, #87a4ba)",
        border: "5px solid #CF6064D8",
        borderRadius: 20,
        width: 100,
        padding: 10,
        fontSize: 20
    }
});

const TimerView = ({ time }) => {
    const classes = useStyles();

    return (
        <Typography className={classes.root}>
            {time}
        </Typography>
    );
};

TimerView.propTypes = {
    time: PropTypes.string.isRequired
};

export default TimerView;