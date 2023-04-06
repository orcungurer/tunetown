import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, sendOrderData } from "../../store/cart-slice";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isEmail = (value) => value.includes("@");

const Checkout = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    surname: true,
    city: true,
    email: true,
  });

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const cityInputRef = useRef();
  const emailInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredSurnameIsValid = !isEmpty(enteredSurname);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredEmailIsValid = isEmail(enteredEmail);

    setFormInputsValidity({
      name: enteredNameIsValid,
      surname: enteredSurnameIsValid,
      city: enteredCityIsValid,
      email: enteredEmailIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredSurnameIsValid &&
      enteredCityIsValid &&
      enteredEmailIsValid;
    
    if (!formIsValid) {
      return;
    }

    const userData = {
      name: enteredName,
      surname: enteredSurname,
      city: enteredCity,
      email: enteredEmail,
    };

    const cartData = {
      items: cart.items,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    };

    const orderData = {
      user: userData,
      orderedItems: cartData,
    };

    dispatch(sendOrderData(orderData));
    dispatch(cartActions.clearCart());
  };

  const nameClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`;
  const surnameClasses = `${classes.control} ${formInputsValidity.surname ? "" : classes.invalid}`;
  const cityClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`;
  const emailClasses = `${classes.control} ${formInputsValidity.email ? "" : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes[`form-controls`]}>
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Enter a valid name.</p>}
        </div>
        <div className={surnameClasses}>
          <label htmlFor="surname">Surname</label>
          <input type="text" id="surname" ref={surnameInputRef} />
          {!formInputsValidity.surname && <p>Enter a valid surname.</p>}
        </div>
        <div className={cityClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Enter a valid city.</p>}
        </div>
        <div className={emailClasses}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" ref={emailInputRef} />
          {!formInputsValidity.email && <p>Enter a valid email.</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
