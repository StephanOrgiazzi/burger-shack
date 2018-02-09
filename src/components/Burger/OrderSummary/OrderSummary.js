import React from 'react';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map( key => {
        return (
            <li key={key}>
            <span style={{textTransform: "capitalize"}} >{key}</span>: {props.ingredients[key]}
            </li>
        )
    });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>Delicious Shack Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Checkout</p>
        </React.Fragment>
    )
};
 
export default orderSummary;