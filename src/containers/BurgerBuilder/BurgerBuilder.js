import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {

    state = {
        order: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        // axios.get("https://burger-shack-5fef2.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     }) ;
    }

    orderHandler = () => {
        this.setState({
            order: true
        });
    }

    orderContinueHandler = () => {
        this.props.history.push("/checkout");
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

        return sum > 0;
    }

    render() {

        const disabledInfo = {...this.props.ingrdnts};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null

        let burger = <Spinner />;

        if (this.props.ingrdnts) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingrdnts}
                    orderCancel={this.orderCancelHandler}
                    orderContinue={this.orderContinueHandler} 
                    totalPrice={this.props.price} />
            );
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingrdnts}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        quantity={this.props.ingrdnts}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingrdnts)}
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

const mapStateToProps = state => {
    return {
        ingrdnts: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrdntName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingrdntName}),
        onIngredientRemoved: (ingrdntName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingrdntName}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));