import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]});
    }

    const ingredientOutput = ingredients.map((singleItem) => {
        return <span style={{
            display: 'inline-block',
            textTransform:'capitalize',
            margin: '0 8px', 
            border:'1px solid #ccc',
            padding: '5px'
        }} key={singleItem.name}>{singleItem.name} ({singleItem.amount}) </span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;