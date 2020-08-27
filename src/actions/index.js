import axios from "axios"
const pick = require("lodash.pick")
const map = require("lodash.map")
const partialRight = require("lodash.partialright")
const sortBy = require("lodash.sortby")
import {
  LOADING,
  ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
  FETCH_ALL_UPCOMING_MOVIES,
  LOADING_MORE,
  FILTERING,
  START_USER_SEARCHING,
  USER_SEARCH_TEXT,
  CLEAR_USER_SEARCH_TEXT,
  FETCH_ALL_USER_SEARCHED_MOVIES,
  FETCH_MORE_USER_SEARCHED_MOVIES,
  CLEAR_ERROR,
} from "./actionTypes"
import axiosService from "../apiService/index"
import { minsToHHMM, filterArr } from "../commonUtils/utils"
const API_REF = require("../apiService/config")
const IMAGE_HOST = `https://image.tmdb.org/t/p/w500`

const sortArrByReleaseDate = myArray => {
  const sortedArr = sortBy(myArray, Obj => {
    return new Date(Obj.release_date)
  })
  return sortedArr.reverse()
}
const mergeArraysConditionally = (listOfUpComingMovies, eachMovieDetails) => {
  let merged = []
  listOfUpComingMovies.every(i =>
    eachMovieDetails.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )
  merged = merged.map(i =>
    Object.assign(
      i,
      eachMovieDetails.find(j => j.id === i.id),
    ),
  )
  let modArr = merged.map(i => {
    return {
      ...i,
      castsArr: i.casts.cast.map(j => j.name),
      genreArr: i.genres.map(j => j.name),
      formattedRuntime: minsToHHMM(i.runtime),
      poster_path: `${IMAGE_HOST}${i.poster_path}`,
    }
  })
  let arrToReturn = map(
    modArr,
    partialRight(pick, [
      "imdb_id",
      "id",
      "poster_path",
      "title",
      "title",
      "overview",
      "vote_average",
      "release_date",
      "genreArr",
      "castsArr",
      "formattedRuntime",
    ]),
  )

  return arrToReturn
}

const getEachMovieDetailsGivenId = (id, index) => {
  return new Promise((resolve, reject) => {
    const URL = `${API_REF.HOST}${id}?api_key=${API_REF.API_KEY}&append_to_response=casts`

    axios.get(URL).then(res => {
      let movieDetails = res.data
      let result = pick(movieDetails, [
        "id",
        "imdb_id",
        "genres",
        "runtime",
        "casts",
      ])
      if (
        result &&
        Object.entries(result).length !== 0 &&
        result.constructor === Object
      ) {
        resolve(result)
      } else {
        reject(new Error("No data received"))
      }
    })
  })
}

export const loadAllUpcomingMovies = page => async dispatch => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    })

    const URL = `${API_REF.API.INITIAL_UPCOMING_MOVIES}${page}`

    axiosService
      .request({
        url: URL,
        method: "GET",
      })
      .then(async response => {
        let upcomingMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            "id",
            "poster_path",
            "title",
            "overview",
            "vote_average",
            "release_date",
          ]),
        )

        upcomingMovies = sortArrByReleaseDate(upcomingMovies)
        const movieIds = upcomingMovies.map(i => i.id)

        let topUpComingIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allTopUpComingIndividualMovies = Promise.all(
          topUpComingIndividualMovies,
        )

        allTopUpComingIndividualMovies
          .then(res => {
            dispatch({
              type: FETCH_ALL_UPCOMING_MOVIES,
              payload: mergeArraysConditionally(upcomingMovies, res),
            })
          })
          .catch(err => {
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}


export const handleUserSearchText = (
  searchTerm,
) => async dispatch => {
  try {
    dispatch({
      type: USER_SEARCH_TEXT,
      payload: true,
    })

    const searchURL = `${API_REF.API.DETAILS_MOVIE_TEXT_SEARCH}${API_REF.API_KEY}&language=en-US&query=${searchTerm}`

    axiosService
      .request({
        url: searchURL,
        method: "GET",
      })
      .then(async response => {
        let searchResultMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            "id",
            "poster_path",
            "title",
            "overview",
            "vote_average",
            "release_date",
          ]),
        )
        const movieIds = searchResultMovies.map(i => i.id)

        let searchResultIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allSearchResultIndividualMovies = Promise.all(
          searchResultIndividualMovies,
        )

        allSearchResultIndividualMovies
          .then(res => {
            dispatch({
              type: FETCH_MORE_USER_SEARCHED_MOVIES,
              payload: mergeArraysConditionally(searchResultMovies, res),
            })
          })
          .catch(err => {
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}



export const clearUserSearchText = () => {
  return {
    type: CLEAR_USER_SEARCH_TEXT,
    payload: "",
  }
}

export const loadMoviesFromUserSearchText = (
  searchTerm,
  page,
) => async dispatch => {
  try {
    dispatch({
      type: START_USER_SEARCHING,
      payload: true,
    })

    const searchURL = `${API_REF.API.DETAILS_MOVIE_TEXT_SEARCH}${API_REF.API_KEY}&language=en-US&page=${page}&query=${searchTerm}`

    axiosService
      .request({
        url: searchURL,
        method: "GET",
      })
      .then(async response => {
        let searchResultMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            "id",
            "poster_path",
            "title",
            "overview",
            "vote_average",
            "release_date",
          ]),
        )

        searchResultMovies = sortArrByReleaseDate(searchResultMovies)

        const movieIds = searchResultMovies.map(i => i.id)

        let searchResultIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allSearchResultIndividualMovies = Promise.all(
          searchResultIndividualMovies,
        )

        allSearchResultIndividualMovies
          .then(res => {
            dispatch({
              type: FETCH_ALL_USER_SEARCHED_MOVIES,
              payload: mergeArraysConditionally(searchResultMovies, res),
            })
          })
          .catch(err => {
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}

export const loadMoreMoviesFromUserSameSearchText = (
  searchTerm,
  page,
) => async dispatch => {
  try {
    dispatch({
      type: START_USER_SEARCHING,
      payload: true,
    })

    const searchURL = `${API_REF.API.DETAILS_MOVIE_TEXT_SEARCH}${API_REF.API_KEY}&language=en-US&page=${page}&query=${searchTerm}`

    axiosService
      .request({
        url: searchURL,
        method: "GET",
      })
      .then(async response => {
        let searchResultMovies = map(
          filterArr(response.data.results),
          partialRight(pick, [
            "id",
            "poster_path",
            "title",
            "overview",
            "vote_average",
            "release_date",
          ]),
        )

        const movieIds = searchResultMovies.map(i => i.id)

        let searchResultIndividualMovies = await movieIds.map(
          getEachMovieDetailsGivenId,
        )

        let allSearchResultIndividualMovies = Promise.all(
          searchResultIndividualMovies,
        )

        allSearchResultIndividualMovies
          .then(res => {
            dispatch({
              type: FETCH_MORE_USER_SEARCHED_MOVIES,
              payload: mergeArraysConditionally(searchResultMovies, res),
            })
          })
          .catch(err => {
            dispatch({
              type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
              payload: error,
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
          payload: error,
        })
      })
  } catch (err) {
    dispatch({
      type: ERROR_WHILE_FETCHING_UPCOMING_MOVIES,
      payload: error,
    })
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
    payload: false,
  }
}
