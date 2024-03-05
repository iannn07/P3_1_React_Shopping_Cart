import { ChangeEvent, ReactElement, useMemo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTION }: PropsType) => {
  // The following code will implement memo, which makes our calculation to be more efficient
  // To make this function to be more efficient, we can use memo
  const img: string = useMemo(
    () => new URL(`../assets/img/${item.sku}.jpg`, import.meta.url).href,
    [item.sku]
  );
  console.log(img);

  // To make this function to be more efficient, we can use memo
  const lineTotal: number = useMemo(
    () => item.qty * item.price,
    [item.qty, item.price]
  );

  // To make this function to be more efficient, we can use memo
  const highestQty: number = Number(
    useMemo(() => (item.qty <= 20 ? 20 : item.qty), [item.qty])
  );

  // To make this function to be more efficient, we can use memo
  // Instead of using .map, we can use Array.from to make an array (Performance & LoC Efficiency)
  const optionValues: number[] = useMemo(
    () => Array.from({ length: highestQty }, (_, i) => i + 1),
    [highestQty]
  );

  // To make this function to be more efficient, we can use memo
  const options: ReactElement[] = useMemo(
    () =>
      optionValues.map((val) => (
        <option key={`opt${val}`} value={val}>
          {val}
        </option>
      )),
    [optionValues]
  );

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTION.QTY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({
      type: REDUCER_ACTION.REMOVE,
      payload: item,
    });
  };

  const content = (
    <li className="cart__item">
      <div className="cart-img-container">
      <img src={img} alt={item.name} className="cart__img" />
      </div>
      <div aria-label="Item Name" className="item-cart-name">
        <p>{item.name}</p>
      </div>
      <div aria-label="Price Per Item" className="item-cart-price">
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(item.price)}
        </p>
      </div>
      <div className="item-qty-container">
        <p>
          Quantity
        </p>
        <select
          aria-label="Item Quantity"
          name="itemQty"
          id="itemQty"
          className="cart__select"
          value={item.qty}
          onChange={onChangeQty}
        >
          {options}
        </select>
      </div>

      <div className="item__cart-subtotal" aria-label="Line Item Subtotal">
        <p>Subtotal</p>
        <p>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(lineTotal)}
        </p>
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );

  return content;
};

export default CartLineItem;
