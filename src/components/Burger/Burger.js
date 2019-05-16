import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // Let's create an array of nested arrays, where each nested array
    // will contain BurgerIngredient objects
    let ingredients = Object.keys(props.ingredients)
        .map(ingName => {
            // below [...Array(n)] is used instead of Array(n)
            // as the former gives you array of <undefined> elements, e.g.
            // if n equals 2, then you'd get [undefined, undefined]
            // while the latter would give you: [empty × 2]
            return [...Array(props.ingredients[ingName])].map((_, i) => {
                return <BurgerIngredient type={ingName} key={ingName + i}/>;
            })
        })
        // now let's flatten the nested array so we could easily see if the
        // user provded no ingredients and thus all our nested arrays are empty
        .reduce((accumulator, currentNestedArray) => {
            return accumulator.concat(currentNestedArray);
        }, []);

    // now when we flattened the array, we can easily check the length
    // to see if the user selected any ingredients
    if (ingredients.length === 0) {
        ingredients = <p>Please select ingredients!</p>
    }

    return(
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;