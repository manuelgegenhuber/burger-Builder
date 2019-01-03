import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.burgerIngredients} />
            </div>
            <Button click={props.canceled} type={'Danger'}>CANCEL</Button>
            <Button click={props.continue} type={'Success'}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;