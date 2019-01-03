import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    componentWillMount(){
        this.setState({
            ingredients: this.props.location.state
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
            </div>
        );
    }
}

export default Checkout;