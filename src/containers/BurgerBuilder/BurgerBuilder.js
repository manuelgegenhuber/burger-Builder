import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
}

class BurgerBuildar extends Component{

    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
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
        alert('You continue!');
    }


    render(){
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} canceled={this.purchaseCancelHandler} continue={this.purchaseContinueHandler} totalPrice={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler.bind(this)}
                disabled = {disableInfo}
                price={this.state.totalPrice}
                purchasable = {this.state.purchasable}
                order={this.purchaseHandler}/>
            </Aux>
        );
    };
}

export default BurgerBuildar;