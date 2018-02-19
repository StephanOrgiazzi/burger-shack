import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.7,
    bacon: 1.3,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        order: false,
        loading: false,
    }

    componentDidMount() {
        axios.get("https://burger-shack-5fef2.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            });
    }

    orderHandler = () => {
        this.setState({
            order: true
        });
    }

    orderContinueHandler = () => {
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            user: {
                name: "Glenn Ross",
                address: {
                    street: "128 Meserole Avenue",
                    zipCode: "41351"
                },
                email: "sample@gmail.com"
            }
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({
                    loading: false,
                    order: false
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    order: false
                })
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

        let orderSummary = null

        let burger = <Spinner />;

        if (this.state.ingredients) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    orderCancel={this.orderCancelHandler}
                    orderContinue={this.orderContinueHandler} 
                    totalPrice={this.state.totalPrice} />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        quantity={this.state.ingredients}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.orderHandler} />
                </React.Fragment>    
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <React.Fragment>
                <Modal 
                show={this.state.order}
                modalClosed={this.orderCancelHandler} >
                {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);