import classes from "./CartItem.module.css";
import { Images } from "../../images";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
  const { id, band, album, price, total, quantity } = props.item;
  const dispatch = useDispatch();

  // we find and show the image of the product if it has the id of our cartItem.
  const image = Images[Object.keys(Images).find(image => image === "image" + id)];

  // we only need the id if we want to remove an item
  const removeItemFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  // when we addItemToCart, we pass an object with the info we need
  const addItemToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id,
      band,
      album,
      price,
    }));
  };

  return (
    <li className={classes.item}>
      <header>
        <img src={image} alt={album} />
        <div className={classes.info}>
          <p className={classes.album}>{album}</p>
          <p className={classes.band}>{band}</p>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.price}>
          <span className={classes.itemtotal}>${total.toFixed(2)}</span>
          <span className={classes.itemprice}>
            (${price.toFixed(2)}/item)
          </span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCartHandler}>-</button>
          <span>{quantity}</span>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </div>
      <hr />
    </li>
  );
};

export default CartItem;