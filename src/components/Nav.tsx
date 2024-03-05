import PropsType from "./PropsType";

const Nav = ({ viewCart, setViewCart }: PropsType) => {

  // Creating the button event
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)}>View Products</button>
  ) : (
    <button onClick={() => setViewCart(true)}>View Cart</button>
  );

  // Creating the navbar for the View Cart Button
  const content = (
    <nav className="nav">
        {button}
    </nav>
  )

  return content;
};

export default Nav;
