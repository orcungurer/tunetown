import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-slice";
import Filter from "./components/Filter/Filter";
import ProductDetails from "./components/Products/ProductDetails";

// we define it outside of the component, so only on the first render it will be true
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const productDetails = useSelector((state) => state.ui.productDetails);
  const showCart = useSelector((state) => state.ui.showCart);

  // we fetch cart data on reload
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // when we reload the page we dont want to sendCartData initially
    if (isInitial) {
      isInitial = false;
      return;
    }

    // when we fetch in the effect above, we replace the cart
    // and since cart changes, this effect runs. to prevent that,
    // we have a check property that we set to true if we add or remove.
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Layout>
        {productDetails && <ProductDetails />}
        <Filter />
        <Products />
        {showCart && <Cart />}
      </Layout>
    </Fragment>
  );
}

export default App;
