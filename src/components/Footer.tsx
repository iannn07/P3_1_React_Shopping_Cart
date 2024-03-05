import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  // Total Item & Total Price Display
  const { totalItems, totalPrice } = useCart();

  // Footer Content - Year Copyright
  const year: number = new Date().getFullYear();

  // Footer Content
  const content = viewCart ? (
    <p>I Need Coffee &copy; {year}</p>
  ) : (
    <>
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
      <p className="copyright">I Need Coffee &copy; {year}</p>
    </>
  );

  const footerWrapper = <footer className="footer">{content}</footer>;

  return footerWrapper;
};

export default Footer;
