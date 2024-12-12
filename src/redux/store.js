import { configureStore } from "@reduxjs/toolkit";

// Reducer untuk berita yang disimpan
const savedNewsReducer = (state = [], action) => {
  switch (action.type) {
    case "SAVE_NEWS":
      return [...state, action.payload];
      
    case "UNSAVE_NEWS":
      // Pastikan filter menggunakan _id
      return state.filter((news) => news._id !== action.payload._id);

    default:
      return state;
  }
};


// Reducer untuk pencarian berita
const searchNewsReducer = (
  state = { news: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case "SEARCH_NEWS_REQUEST":
      return { ...state, loading: true, error: null };
    case "SEARCH_NEWS_SUCCESS":
      return { ...state, loading: false, news: action.payload };
    case "SEARCH_NEWS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Membuat store dengan beberapa reducer
const store = configureStore({
  reducer: {
    savedNews: savedNewsReducer,
    searchNews: searchNewsReducer, // Tambahkan reducer pencarian berita
  },
});

export default store;
