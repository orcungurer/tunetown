import classes from "./ProductItem.module.css";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import { useState } from "react";

const ProductItem = (props) => {
  const { id, band, genre, album, price, image, tracklist, releaseDate, listBy } = props;
  const dispatch = useDispatch();

  let specialClasses = `list${listBy}Item`;
  const cssClasses = `${classes.item} ${classes[specialClasses]}`;
  
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const quantity = useSelector((state) => state.cart.totalQuantity);

  // 3rd way for buttonText: overkill
  // const [buttonText, setButtonText] = useState("Add to Cart");
  // useEffect(() => {
  //   if (buttonText === "Added!") {
  //     const timer = setTimeout(() => {
  //       setButtonText("Add to Cart");
  //     }, 1000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [buttonText]);

  const addToCartHandler = (event) => {
    // prevent the click event from bubbling up to the li element,
    // and triggering its click handler.
    event.stopPropagation();
    dispatch(cartActions.addItemToCart({
      id,
      band,
      album,
      price,
    }));
    if (quantity !== 9) {
      setIsAddedToCart(true);
    }
    // 2nd way for buttonText: leaner but not cleaner
    // event.target.innerText = "Added!";
    setTimeout(() => {
      setIsAddedToCart(false);
      // event.target.innerText = "Add to Cart";
    }, 500)
    // 3rd way for buttonText: overkill
    // setButtonText("Added!");
  };

  const showProductDetailsHandler = () => {
    dispatch(uiActions.showProductDetails({
      id,
      band,
      album,
      price,
      genre,
      image,
      tracklist,
      releaseDate,
    }));
  };

  return (
    <li className={cssClasses} onClick={showProductDetailsHandler}>
      <Card className={classes.card}>
        <div className={classes["image-wrapper"]}>
          <img src={image} alt={album} />
        </div>
        <header>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p className={classes.album}>{album}</p>
        <p className={classes.band}>{band}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>{isAddedToCart ? "Added!" : "Add to Cart"}</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
