import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.7,
    bacon: 1.3,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
    }

    addIngredientHandler = (type) => {
        let previousCount = this.state.ingredients[type];
        const updatedCount = previousCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        let priceAddition = INGREDIENT_PRICES[type];
        const previousPrice = this.state.totalPrice;
        let updatedPrice = previousPrice + priceAddition;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients,
        });
    }

    removeIngredientHandler = (type) => {
        
    }

    render() {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls ingredientAdded={this.addIngredientHandler} />
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;