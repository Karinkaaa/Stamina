import React from "react";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { STAMINA } from "../utils/constants";

const useStyles = makeStyles({
    root: {
        background: "#2c2c65",
        boxShadow: "0 0 10px navy"
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