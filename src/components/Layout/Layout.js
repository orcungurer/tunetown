import { Fragment } from "react";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Layout.module.css";

// Layout has 4 children; one is Header, which is being rendered here
// the others are Filter, Products, and Cart components which we pass as children on App component.

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className={classes["flex-container"]}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
