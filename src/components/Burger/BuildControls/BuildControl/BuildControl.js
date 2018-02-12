import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button>
                <span 
                className={classes.Less} 
                onClick={props.ingredientRemoved} 
                disabled={props.disabled} ><strong>-</strong></span>
                <span>{props.quantity}</span>
                <span
                className={classes.More} 
                onClick={props.ingredientAdded} ><strong>+</strong></span>
            </button>
        </div>
    )
};

export default buildControl;