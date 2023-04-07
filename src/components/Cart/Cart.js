import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import Modal from "../UI/Modal";
import { uiActions } from "../../store/ui-slice";
import Checkout from "./Checkout";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const [isCheckout, setIsCheckout] = useState(false);
  const notification = useSelector((state) => state.ui.notification);

  const hideCartHandler = () => {
    dispatch(uiActions.toggle());
    dispatch(uiActions.hideNotification());
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  let warning = null;

  if (quantity === 9) {
    warning = (
      <div className={classes.info}>
        <span>You cannot add more than {quantity} items!</span>
      </div>
    );
  }

  let content = (
    <p className={classes[`empty-cart`]}>🛒 Start adding items to your cart!</p>
  );

  if (quantity > 0) {
    content = (
      <Fragment>
        <ul className={classes.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                band: item.band,
                album: item.album,
                price: item.price,
                total: item.total,
                quantity: item.quantity,
              }}
            />
          ))}
        </ul>
      </Fragment>
    );
  }

  const cartModalContent = (
    <Fragment>
      <div className={classes.cart}>
        {warning}
        {content}
      </div>
      {quantity > 0 && (
        <p className={classes.price}>Total: ${total.toFixed(2)}</p>
      )}
      <div className={classes.actions}>
        {!isCheckout && (
          <Fragment>
            <button
              className={classes["close-button"]}
              onClick={hideCartHandler}
            >
              Close
            </button>
            {quantity > 0 && (
              <button
                className={classes["order-button"]}
                onClick={orderHandler}
              >
                Order
              </button>
            )}
          </Fragment>
        )}
        {isCheckout && <Checkout onClose={hideCartHandler} />}
      </div>
    </Fragment>
  );

  const isSubmittingModalContent = (
    <p>{notification && notification.message}</p>
  );

  const didSubmitModalContent = (
    <Fragment>
      <h2 className={classes["notification-title"]}>
        {notification && notification.title}
      </h2>
      <p>{notification && notification.message}</p>
      <div className={classes.actions}>
        <button className={classes["close-button"]} onClick={hideCartHandler}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={hideCartHandler}>
      {!notification && cartModalContent}
      {notification &&
        notification.status === "pending" &&
        isSubmittingModalContent}
      {notification &&
        notification.status === "success" &&
        didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
