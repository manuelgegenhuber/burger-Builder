import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


class BurgerBuildar extends Component{

    state = {
        ingredients:{
            salad: 1,
            bacon: 0,
            cheese: 1,
            meat: 1
        }
    }

    render(){
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls/>
            </Aux>
        );
    };
}

export default BurgerBuildar;