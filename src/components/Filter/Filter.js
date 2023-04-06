import Card from "../UI/Card";
import classes from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store/filter-slice";
import FilterItem from "./FilterItem";

const Filter = () => {
  const dispatch = useDispatch();
  const selectedGenres = useSelector((state) => state.filter.selectedGenres);
  const selectedArtists = useSelector((state) => state.filter.selectedArtists);

  // listing every unique(Set) genre alphabetically(sort):
  const genres = useSelector((state) => {
    const allGenres = state.filter.products.map((product) => product.genre);
    allGenres.sort((a, b) => a.localeCompare(b));
    return [...new Set(allGenres)];
  });

  const artists = useSelector((state) => {
    const allArtists = state.filter.products.map((product) => product.band);
    allArtists.sort((a, b) => a.localeCompare(b));
    return [...new Set(allArtists)];
  });

  const toggleGenreHandler = (genre) => {
    dispatch(filterActions.selectedGenre(genre));
  };

  const toggleArtistHandler = (artist) => {
    dispatch(filterActions.selectedArtist(artist));
  };

  return (
    <div className={classes.filter}>
      <h2>Filters</h2>
      <Card className={classes.card}>
        <div className={classes.filters}>
          <FilterItem
            title="Genres"
            items={genres}
            selectedItems={selectedGenres}
            toggleItemHandler={toggleGenreHandler}
          />
          <FilterItem
            title="Bands/Artists"
            items={artists}
            selectedItems={selectedArtists}
            toggleItemHandler={toggleArtistHandler}
          />
        </div>
      </Card>
    </div>
  );
};

export default Filter;
