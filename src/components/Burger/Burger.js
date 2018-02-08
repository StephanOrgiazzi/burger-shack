import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let ingredientsArray = Object.keys(props.ingredients).map(ingredientType => {
        return [...Array(props.ingredients[ingredientType])].map((_, index) => {
            return <BurgerIngredient key={ingredientType + index} type={ingredientType} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if (ingredientsArray.length === 0) {
        ingredientsArray = "Start adding ingredients!"
    }
    

/*     const ingredientsArray = Object.keys(props.ingredients).map((ingredientType, index) => {
        return [...Array(Object.values(props.ingredients)[index])].map((e, i) => <BurgerIngredient key={ingredientType + i} type={ingredientType} />)
    }); */

    return (
        <div className={classes.Burger} >
            <BurgerIngredient type="bread-top" />
                {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;
