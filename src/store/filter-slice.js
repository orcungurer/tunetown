import { createSlice } from "@reduxjs/toolkit";
import DUMMY_PRODUCTS from "../products";

const initialState = {
  selectedGenres: [],
  selectedArtists: [],
  products: DUMMY_PRODUCTS,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    selectedGenre(state, action) {
      // if our selectedGenres array includes a genre, and when it's clicked,
      // it means that it is unchecked. so we remove it from the array.
      // else, we push the selected genre to the array. same for artists
      if (state.selectedGenres.includes(action.payload)) {
        state.selectedGenres = state.selectedGenres.filter(
          (genre) => genre !== action.payload
        );
      } else {
        state.selectedGenres.push(action.payload);
      }
    },
    selectedArtist(state, action) {
      if (state.selectedArtists.includes(action.payload)) {
        state.selectedArtists = state.selectedArtists.filter(
          (artist) => artist !== action.payload
        );
      } else {
        state.selectedArtists.push(action.payload);
      }
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
