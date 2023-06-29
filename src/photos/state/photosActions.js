import * as types from "./actionTypes";
import axios from "axios";

export const getRecentPhotos = (dispatch, page) => {
  (async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=fe9ba71e471fef3d6088dd1ff1c41300&format=json&nojsoncallback=1&page=${page}`
      );
      dispatch({
        type: types.GET_RECENT_PHOTOS,
        payload: response.data.photos,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

export const getSearchedPhotos = (dispatch, page, searchQuery) => {
  (async () => {
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=fe9ba71e471fef3d6088dd1ff1c41300&text=${searchQuery}&format=json&nojsoncallback=1&page=${page}`

        );
        //Prihvata sve sa API
        console.log(response.data.photos);
      dispatch({
        type: types.GET_SEARCHED_PHOTOS,
        payload: response.data.photos,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};
