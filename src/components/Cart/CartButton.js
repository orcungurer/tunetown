import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import CartIcon from "../Icons/CartIcon";

const CartButton = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCart = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
