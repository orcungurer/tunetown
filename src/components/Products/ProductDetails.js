import classes from "./ProductDetails.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.ui.productDetails);
  // console.log("itemDetails", productDetails);

  const hideProductDetailsHandler = () => {
    dispatch(uiActions.hideProductDetails());
  };

  return (
    <Modal onClose={hideProductDetailsHandler}>
      <header className={classes.details}>
        <img src={productDetails.image} alt={productDetails.album} />
        <div className={classes[`details-inner`]}>
          <p className={classes.album}>
            {productDetails.album} ({productDetails.releaseDate})
          </p>
          <p className={classes.band}>{productDetails.band}</p>
          <div className={classes.genre}>{productDetails.genre}</div>
        </div>
      </header>
      <div className={classes.tracklist}>
        <h3>Tracklist</h3>
        {productDetails.tracklist.map((track) => (
          <span key={track} className={classes.tracks}>
            {track}
          </span>
        ))}
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={hideProductDetailsHandler}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProductDetails;
