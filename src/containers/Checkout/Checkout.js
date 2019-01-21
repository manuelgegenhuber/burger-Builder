import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: {},
        price: null,
    }

    componentDidMount(){
        this.setState({
            ingredients: this.props.location.state ? this.props.location.state : {},
            price: this.props.location.totalPrice
        });
    }

    render(){

        const checkoutCanceledHandler = () => {
            console.log(this.props);
            this.props.history.goBack();
        }

        const checkoutContinuedHandler = () => {
            this.props.history.replace(this.props.match.url + '/contact-data');
        }

        return(
            <div>
                <CheckoutSummary burgerIngredients={this.state.ingredients} canceled={checkoutCanceledHandler} continue={checkoutContinuedHandler}/>
                <Route path={this.props.match.url + '/contact-data'} render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price} />)} />
            </div>
        );
    }
}

export default Checkout;