import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: 10,
        fontSize: 20
    },
    strong: {
        color: "#2c2c65"
    },
    em: {
        color: "#7a84bf",
        fontWeight: "bold"
    }
});

const ModalText = ({ text, data }) => {
    const classes = useStyles();

    return (
        <Typography className={classes.root}>
            <strong className={classes.strong}>{text}: </strong>
            <em className={classes.em}>{data}</em>
        </Typography>
    );
};

ModalText.propTypes = {
    text: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired
};

export default ModalText;