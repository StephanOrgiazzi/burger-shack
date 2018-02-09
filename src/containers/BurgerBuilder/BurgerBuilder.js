import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


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
        purchasable: false,
        order: false,
    }

    orderHandler = () => {
        this.setState({
            order: true
        });
    }

    orderCancelHandler = () => {
        this.setState({
            order: false
        })
    }
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({
            purchasable: sum > 0,
        })
    }

    addIngredientHandler = (type) => {
        let previousCount = this.state.ingredients[type];
        const updatedCount = previousCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        let priceAddition = INGREDIENT_PRICES[type];
        const previousPrice = this.state.totalPrice;
        let updatedPrice = previousPrice + priceAddition;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let previousCount = this.state.ingredients[type];
        if (previousCount <= 0) {
            return;
        }
        const updatedCount = previousCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        let priceSubstraction = INGREDIENT_PRICES[type];
        const previousPrice = this.state.totalPrice;
        let updatedPrice = previousPrice - priceSubstraction;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal 
                show={this.state.order}
                modalClosed={this.orderCancelHandler} >
                    <OrderSummary 
                    ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.orderHandler} />
                </div>
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;