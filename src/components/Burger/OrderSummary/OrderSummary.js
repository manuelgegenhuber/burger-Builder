import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return (<li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
                </li>);
    });



    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong> €</p>
            <p>Continue to Checkout?</p>
            <Button click={props.canceled} type={'Danger'}>CANCEL</Button>
            <Button click={props.continue} type={'Success'}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;