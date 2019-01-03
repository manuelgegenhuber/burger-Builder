import React, {Component} from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

class BurgerBuildar extends Component{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-c3457.firebaseio.com/ingredients.json')
        .then((response) => {
            this.setState({
                ingredients: response.data
            });
        })
        .catch((error) => {
            this.setState({error: true});
        });
    }

    updatePruchaseState = (updatedIngredients) => {

        let sum = 0;

        for (const val of Object.values(updatedIngredients)) {
            sum += val;
        }

        if(sum > 0){
            this.setState({
                purchasable: true
            });
        }else{
            this.setState({
                purchasable: false
            });
        }
        
    }

    addIngredientHandler = (type) => {

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] += 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePruchaseState(updatedIngredients);
    }

    removeIngredientHandler(type){
        const updatedIngredients = {
            ...this.state.ingredients
        }

        if(this.state.ingredients[type] <= 0){
            return;
        }

        updatedIngredients[type] -= 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.updatePruchaseState(updatedIngredients);

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () =>{
        this.props.history.push({
            pathname: '/checkout',
            state: this.state.ingredients
        });

        /*this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Mustermann',
                adress: {
                    street: 'Elmstreet 6',
                    zipCode: '666',
                    country: 'New York'
                },
                email: 'test@mustermann.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then((response) => {
            this.setState({loading: false, purchasing: false});
        }).catch((error) => {
            this.setState({loading: false, purchasing: false});
        });*/
    }


    render(){
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.state.ingredients){
            burger = <Aux>
            <Burger ingredients={this.state.ingredients}></Burger>
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler.bind(this)}
            disabled = {disableInfo}
            price={this.state.totalPrice}
            purchasable = {this.state.purchasable}
            order={this.purchaseHandler}/>
        </Aux>;

        orderSummary = <OrderSummary ingredients={this.state.ingredients} canceled={this.purchaseCancelHandler} continue={this.purchaseContinueHandler} totalPrice={this.state.totalPrice} />;

        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuildar, axios);