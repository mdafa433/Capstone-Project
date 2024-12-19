import { configureStore } from "@reduxjs/toolkit";


const savedNewsReducer = (state = [], action) => {
  switch (action.type) {
    case "Save_News":
      return [...state, action.payload];
      
    case "Unsave_News":
      return state.filter((news) => news._id !== action.payload._id);

    default:
      return state;
  }
};


const searchNewsReducer = (
  state = { news: [], loading: false, error: null },
  action) => {
  switch (action.type) {
    case "Search_News_Request":
      return { ...state, loading: true, error: null };
    case "Search_News_Success":
      return { ...state, loading: false, news: action.payload };
    case "Search_News_Failure":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const store = configureStore({
  reducer: {
    savedNews: savedNewsReducer,
    searchNews: searchNewsReducer, 
  },
});

export default store;
