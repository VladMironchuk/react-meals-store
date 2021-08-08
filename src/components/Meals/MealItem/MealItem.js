import React, { useContext } from "react";

import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = props => {

  const cartCtx = useContext(CartContext)

  const fixedPrice = new Intl.NumberFormat(
    'en-EN',
    {style: 'currency', currency: 'USD'})
    .format(props.price)

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount,
      price: props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{fixedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
      </div>
    </li>
  )
}

export default MealItem