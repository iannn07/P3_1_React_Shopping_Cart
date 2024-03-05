import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

const Cart = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart } = useCart();
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION.SUBMIT });
    setConfirm(true);
    setTimeout(() => {
      setIsClicked(true);
    }, 250);
  };
  const pageContent = confirm ? (
    <h2>Thank you for your order</h2>
  ) : (
    <>
      <div className="cart-container">
        <ul className="cart">
          {cart.map((item) => (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTION={REDUCER_ACTION}
            />
          ))}
        </ul>
      </div>
      <div className="cart-totals-container">
        <div className="cart__totals">
          <div className="total-item-price-grid">
            <div>
              <p>
                <strong>Total Items</strong>
              </p>
              <p>
                <strong>Total Cost</strong>
              </p>
            </div>
            <div>
              <p>{totalItems}</p>
              <p>{totalPrice}</p>
            </div>
          </div>
        </div>
        <button
          className={`cart__submit ${isClicked ? "clicked" : ""}`}
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Submit Order
        </button>
      </div>
    </>
  );
  const content = (
    <>
      <div className="main-cart-container">
        <h2 className="cart-heading">Cart</h2>
        <main className="main main--cart">{pageContent}</main>
      </div>
    </>
  );
  return content;
};

export default Cart;
