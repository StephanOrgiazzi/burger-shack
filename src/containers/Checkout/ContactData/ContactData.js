import React, {Component} from 'react';
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.module.css";

class ContactData extends Component {

    state = {
        name: "",
        email: "",
        adress: {
            street: "",
            zipCode: ""
        },
        loading: false
    }

    confirmOrderHandler = (event) => { // Useful to prevent reloading on submit, for e.g.
        event.preventDefault();
        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                });
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            });
    }

    render() { 
        let form = (
            <form>
                <input type="text" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="text" name="street" placeholder="Street Address"/>
                <input type="text" name="zipcode" placeholder="Zipcode"/>
                <Button 
                    btnType="Success"
                    click={this.confirmOrderHandler} >ORDER NOW</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact information:</h4>
                {form}
            </div>
        );
    }
}
 
export default ContactData;