import { createContext, useMemo, useReducer, ReactElement } from "react";

// Cart Item Type Initialization
export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

// Cart State Type Initialization
type CartStateType = { cart: CartItemType[] };

// Initialize the cart state
const initCartState: CartStateType = { cart: [] };

// Cart Reducer Action Type
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QTY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

// Define the type for the reducer actions
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

// Reducer action structure
export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

// Reducer function to handle cart state actions
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    // Adding item to the cart
    case REDUCER_ACTION_TYPE.ADD: {
      // Checks the missing action.payload
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }

      const { sku, name, price } = action.payload;

      // Filter out the existing item with the same sku
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // Checks if the item is already in the cart
      const itemExist: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      // Add the item if it's not in the cart
      const itemQty: number = itemExist ? itemExist.qty + 1 : 1;

      // Add the new state with the updated cart
      return {
        ...state,
        cart: [...filteredCart, { sku, name, price, qty: itemQty }],
      };
    }
    // Remove item from the cart
    case REDUCER_ACTION_TYPE.REMOVE: {
      // Checks the missing action.payload
      if (!action.payload) {
        throw new Error("action.payload missing in REMOVE action");
      }

      const { sku } = action.payload;

      // Filter out the existing item with the same sku
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // Add the new state with the updated cart
      return { ...state, cart: filteredCart };
    }
    // Update the quantity in the cart
    case REDUCER_ACTION_TYPE.QTY: {
      // Checks the missing action.payload
      if (!action.payload) {
        throw new Error("action.payload missing in QTY action");
      }
      const { sku, qty } = action.payload;

      // Checks if the item is already in the cart
      const itemExist: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      // Throw error if the item is not in the cart
      if (!itemExist) {
        throw new Error(`can't QTY for product ${sku} as it's not in the cart`);
      }

      // Add the new state with the updated cart
      const updatedItem: CartItemType = { ...itemExist, qty };

      // Filter out the existing item and return the new state with the updated item
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      // Add the new state with the updated cart
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    // Submit the cart for checkout
    case REDUCER_ACTION_TYPE.SUBMIT: {
      // Reset the cart
      return { ...state, cart: [] };
    }
    default:
      throw new Error(`unhandled action type: ${action.type}`);
  }
};

// Hook for manage the shopping cart state
const UseCartContext = (initCartState: CartStateType) => {
  // Reducer for managing cart state
  const [state, dispatch] = useReducer(reducer, initCartState);

  // Memoizing reducer action type
  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  // Total number of items in the cart
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  // Formatting total price in USE currency format and calculate total price
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.qty * cartItem.price;
    }, 0)
  );

  // Sorting the cart
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart };
};

// Define the type for user cart context
export type UserCartContextType = ReturnType<typeof UseCartContext>;

// Initialize the user cart context state
const initCartContextState: UserCartContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

// Create the user cart context
export const CartContext =
  createContext<UserCartContextType>(initCartContextState);

// Define the type for children components
type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

// Wrap it up with the cart context
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={UseCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
