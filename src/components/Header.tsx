type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>I Need Coffee</h1>
        <div className="header__price-box">
          <p>Total Items:</p>
          <p>Total Cost:</p>
        </div>
      </div>
    </header>
  );
  return <div></div>;
};

export default Header;
