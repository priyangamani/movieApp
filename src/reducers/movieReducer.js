import {
    ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
    FETCH_ALL_UPCOMING_MOVIES,
    START_USER_SEARCHING,
    USER_SEARCH_TEXT,
    CLEAR_USER_SEARCH_TEXT,
    FETCH_ALL_USER_SEARCHED_MOVIES,
    FETCH_MORE_USER_SEARCHED_MOVIES,
    CLEAR_ERROR,
  } from '../actions/actionTypes'
  
  const initialState = {
    loading: true,
    allUpcomingMovies: [],
    loadingMore: false,
    filtering: false,
    refreshing: false,
    userSearchedMovieText: '',
    moviesFromUserSearchText: [],
    error_while_fetching_movie_data: false,
  }
  export default function(state = initialState, actions) {
    switch (actions.type) {
      case FETCH_ALL_UPCOMING_MOVIES:
        return {
          ...state,
          allUpcomingMovies: [...state.allUpcomingMovies, ...actions.payload],
          loading: false,
          loadingMore: false,
          refreshing: false,
          error_while_fetching_movie_data: false,
        }
      case ERROR_WHILE_FETCHING_UPCOMING_MOVIES:
        return {
          ...state,
          error_while_fetching_movie_data: true,
        }
      case CLEAR_ERROR:
        return {
          ...state,
          error_while_fetching_movie_data: false,
        }
  
      case FETCH_ALL_USER_SEARCHED_MOVIES:
        return {
          ...state,
          moviesFromUserSearchText: actions.payload,
          loading: false,
          loadingMore: false,
          refreshing: false,
          error_while_fetching_movie_data: false,
        }
  
      case FETCH_MORE_USER_SEARCHED_MOVIES:
        return {
          ...state,
          moviesFromUserSearchText: [
            ...state.moviesFromUserSearchText,
            ...actions.payload,
          ],
          loading: false,
          loadingMore: false,
          refreshing: false,
          error_while_fetching_movie_data: false,
        }
  
      case START_USER_SEARCHING:
        return {
          ...state,
          allUpcomingMovies: [],
        }
  
      case USER_SEARCH_TEXT:
        return {
          ...state,
          userSearchedMovieText: actions.payload,
        }
  
      case CLEAR_USER_SEARCH_TEXT:
        return {
          ...state,
          loading: false,
          loadingMore: false,
          refreshing: false,
          userSearchedMovieText: actions.payload,
          moviesFromUserSearchText: [],
          error_while_fetching_movie_data: false,
        }
  
      default:
        return state
    }
  }
  