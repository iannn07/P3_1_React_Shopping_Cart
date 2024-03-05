import useCart from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart } = useCart();
  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTION.SUBMIT });
    setConfirm(true);
  };
  const pageContent = confirm ? (
    <h2>Thank you for your order</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
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
          <button
            className="cart__submit"
            disabled={!totalItems}
            onClick={onSubmitOrder}
          >
            Submit your order
          </button>
        </div>
      </div>
    </>
  );
  const content = <main className="main main--cart">{pageContent}</main>;
  return content;
};

export default Cart;
