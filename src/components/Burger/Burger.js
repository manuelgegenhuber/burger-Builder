import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //Object.keys -> turns object to array (without values)
    let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        });
    }).reduce((accumulator, el) => {
       return  accumulator.concat(el);
    },[]);

    console.log(transformedIngredients);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Select some Ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;