import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {text} from "./text";

const useStyles = makeStyles({
    root: {
        padding: '26px',
        marginTop: '250px',
        position: 'center',
    },
    left: {
        paddingLeft: '15px',
        paddingTop: '15px',
        paddingBottom: '15px',
        background: 'linear-gradient(45deg, #59608C 30%, #6A90B2 70%)',
        borderTopLeftRadius: '26px',
        borderBottomLeftRadius: '26px',
        borderLeftStyle: 'solid',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: 'rgba(207,96,100,0.85)',
        borderWidth: '6px',
        textAlign: 'right',
        float: 'left',
        width: '880px',
        minWidth: '45%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    right: {
        paddingRight: '15px',
        paddingTop: '15px',
        paddingBottom: '15px',
        background: 'linear-gradient(45deg, #35B0FF 30%, #3A84FF 70%)',
        borderTopRightRadius: '26px',
        borderBottomRightRadius: '26px',
        borderRightStyle: 'solid',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderColor: 'rgba(207,91,46,0.85)',
        borderWidth: '6px',
        float: 'right',
        width: '880px',
        minWidth: '45%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    pre: {
        fontSize: '45px',
        marginTop: '8px',
        marginBottom: '8px',
    }
});

export default function () {

    const classes = useStyles();
    const spaceStart = 'SPACE - START, ESC - PAUSE . . .';

    const [rightText, setRightText] = useState(text);
    const [leftText, setLeftText] = useState('');
    const [typedChars, setTypedChars] = useState(0);
    const [typedCorrectChars, setTypedCorrectChars] = useState(0);

    window.onkeypress = function (event) {

        let key = event.key;
        let letter = rightText[0];

        if (key === letter) {
            setLeftText(leftText + key);
            setRightText(rightText.slice(1));
            setTypedChars(typedChars + 1);
            setTypedCorrectChars(typedCorrectChars + 1);
        } else {
            setTypedChars(typedChars + 1);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <pre style={{float: 'right'}} className={classes.pre}>
                    {leftText || spaceStart}
                </pre>
            </div>

            <div className={classes.right}>
                <pre className={classes.pre}>
                    {rightText}
                </pre>
            </div>
        </div>
    )
}