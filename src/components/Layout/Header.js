import CartButton from "../Cart/CartButton";
import classes from "./Header.module.css";
import TuneTown from "../../assets/TuneTown.svg";
import { animateScroll as scroll } from "react-scroll";

const Header = () => {
  const homeHandler = () => {
    scroll.scrollToTop();
  };

  return (
    <header className={classes.header}>
      <h1 onClick={homeHandler} className={classes.logo}>
        <img src={TuneTown} alt="logo" />
      </h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
