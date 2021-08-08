import React, {useContext} from "react";

import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem'

const Cart = props => {

  const cartCtx = useContext(CartContext)

  const hasItems = cartCtx.items.length > 0
  const totalAmount = new Intl.NumberFormat(
    'en-EN',
    {style: 'currency', currency: 'USD'})
    .format(cartCtx.totalAmount || 0)

  const cartAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItems =
    <ul className={classes['cart-items']}>
      {
        cartCtx.items.map(item => <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartAddHandler.bind(null, item)}
          onRemove={cartRemoveHandler.bind(null, item.id)}
        />)
      }
    </ul>

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart