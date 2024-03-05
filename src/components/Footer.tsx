import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
}

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
      <p>Total Items: {totalItems}</p>
      <p>Total Cost: {totalPrice}</p>
      <p>I Need Coffee &copy; {year}</p>
    </>
  );

  const footerWrapper = <footer className="footer">{content}</footer>;
  
  return footerWrapper;
};

export default Footer;
