import React, {useContext, useState} from "react";

import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem'
import Checkout from "./Checkout";

const Cart = props => {

  const cartCtx = useContext(CartContext)

  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

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

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://react-backend-cf21f-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
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

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
      {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
    </>
  )

  const isSubmittingOrderData = <p>Sending order data...</p>

  const didSubmitModalContent =
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>Close</button>
      </div>
    </>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingOrderData}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart