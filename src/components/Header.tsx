import PropsType from "./PropsType";
import Nav from "./Nav";
import useCart from "../hooks/useCart";

const Header = ({ viewCart, setViewCart }: PropsType) => {
  // Total Item & Total Price Display
  const { totalItems, totalPrice } = useCart();

  // Header Content
  const content = (
    <header className="header">
      {/* Header Title */}
      <div className="header__title-bar">
        <h1>I Need Coffee</h1>
        <div className="header__price-box">
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
      </div>
      {/* NavBar */}
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
};

export default Header;
