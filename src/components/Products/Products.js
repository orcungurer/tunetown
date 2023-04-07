import classes from "./Products.module.css";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import Select from "react-select";

const Products = () => {
  const products = useSelector((state) => state.filter.products);
  const selectedGenres = useSelector((state) => state.filter.selectedGenres);
  const selectedArtists = useSelector((state) => state.filter.selectedArtists);
  const [sortOrder, setSortOrder] = useState("releaseDateDesc");
  const [listBy, setListBy] = useState("5");

  let specialClasses = `list${listBy}Item`;
  const cssClasses = `${classes["product-items"]} ${classes[specialClasses]}`;

  // we filter our products if we have selected genres and/or artists
  const filteredProducts = products.filter((product) => {
    if (selectedGenres.length > 0 && !selectedGenres.includes(product.genre)) {
      return false;
    }
    if (selectedArtists.length > 0 && !selectedArtists.includes(product.band)) {
      return false;
    }
    return true;
  });

  const groupedOptions = [
    { value: "releaseDateDesc", label: "Sort By" },
    {
      label: "Artist",
      options: [
        { value: "artistAZ", label: "(A-Z)" },
        { value: "artistZA", label: "(Z-A)" },
      ],
    },
    {
      label: "Price",
      options: [
        { value: "priceAsc", label: "(Low-High)" },
        { value: "priceDesc", label: "(High-Low)" },
      ],
    },
    {
      label: "Release Date",
      options: [
        { value: "releaseDateAsc", label: "(Old-New)" },
        { value: "releaseDateDesc", label: "(New-Old)" },
      ],
    },
  ];

  // we sort our filtered products based on some criteria
  if (sortOrder === "default") {
    filteredProducts.sort((a, b) => a.id - b.id);
  } else if (sortOrder === "artistAZ") {
    filteredProducts.sort((a, b) => a.band.localeCompare(b.band));
  } else if (sortOrder === "artistZA") {
    filteredProducts.sort((a, b) => b.band.localeCompare(a.band));
  } else if (sortOrder === "priceAsc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "priceDesc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "releaseDateAsc") {
    filteredProducts.sort((a, b) => a.releaseDate - b.releaseDate);
  } else if (sortOrder === "releaseDateDesc") {
    filteredProducts.sort((a, b) => b.releaseDate - a.releaseDate);
  }

  const sortingHandler = (event) => {
    // setSortOrder(event.target.value);
    setSortOrder(event.value);
  };

  const listByHandler = (id) => {
    setListBy(id);
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary50: "#f94c57",
      primary25: "#f2f2f2",
      primary: "#f94c57",
    },
  });

  return (
    <div className={classes.products}>
      <header className={classes.header}>
        <div className={classes.listBy}>
          <span onClick={() => listByHandler(4)}>IIII</span>
          <span onClick={() => listByHandler(5)}>IIIII</span>
        </div>
        <h2>Products</h2>
        {/* <div className={classes.sortBy}>
          <select defaultValue={"default"} onChange={sortingHandler}>
            <option value="default" disabled>Sort By</option>
          </select>
        </div> */}
        <div className={classes.sortBy}>
          <Select
            options={groupedOptions}
            defaultValue={groupedOptions[0]}
            onChange={sortingHandler}
            theme={customTheme}
          />
        </div>
      </header>
      <ul className={cssClasses}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            band={product.band}
            genre={product.genre}
            album={product.album}
            price={product.price}
            image={product.image}
            tracklist={product.tracklist}
            releaseDate={product.releaseDate}
            listBy={listBy}
          />
        ))}
      </ul>
    </div>
  );
};

export default Products;
