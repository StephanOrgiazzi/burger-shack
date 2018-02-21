import React from 'react';

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h2>We hope you'll enjoy your Shack Burger!</h2>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
            btnType="Danger"
            click={props.checkoutCancel} >CANCEL</Button>
            <Button 
            btnType="Success"
            click={props.checkoutContinue} >ORDER NOW</Button>
        </div>
    );
}
 
export default checkoutSummary;