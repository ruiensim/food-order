import { useContext } from "react";
import { formatter } from "../util/formatting";
import Button from './UI/Button';
import CartContext from '../store/CartContext.jsx'
import urlfront from "../api.js";

export default function MealItems({meals}){
    const cartCtx = useContext(CartContext);

    function handleMealAddToCart(){
        cartCtx.addItem(meals);

    }

    return(
        <li className="meal-item">
            <article>
                <img src={`${urlfront}${meals.image}`}  alt = {meals.name}/>
                <div>
                    <h3>{meals.name}</h3>
                    <p className="meal-item-price">{formatter.format(meals.price)}</p>
                    <p className="meal-item-description">{meals.description}</p>
                </div>
                <p className="meal-item-action">
                    <Button onClick={handleMealAddToCart}>
                        Add to Cart
                    </Button>
                </p>
            </article>

        </li>
    )
}