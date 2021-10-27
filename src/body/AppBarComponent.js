import React from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { STAMINA } from "../utils/constants";

const useStyles = makeStyles({
    root: {
        background: "#35b0ff2e",
        boxShadow: "0 0 2px whitesmoke"
    },
    typo: {
        fontSize: 25,
        fontWeight: 600
    }
});

const AppBarComponent = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.root}>
            <Toolbar>
                <Typography className={classes.typo}>
                    {STAMINA}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;