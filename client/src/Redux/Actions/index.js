import axios from 'axios';

export const GET_ALL_RECIPE = 'GET_ALL_RECIPE';
export const DETAILS_RECIPE = 'DETAILS_RECIPE';
export const SEARCH_RECIPE = 'SEARCH_RECIPE';
export const SCORE_RECIPE = 'SCORE_RECIPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_DIETS = 'GET_DIETS';
export const ORDER_BY_DIETS = 'ORDER_BY_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';




export const getAllRecipes = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3001/recipes')
    dispatch({
      type: GET_ALL_RECIPE,
      payload: res.data,
    })
  }
}

export const detailsRecipe = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/recipes/${id}`)
      dispatch({
        type: DETAILS_RECIPE,
        payload: res.data,
      })
    } catch (error) {
      console.log(error)
    }

  }
}

export function searchRecipes(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/recipes?name=${payload}`
      );
      return dispatch({
        type: SEARCH_RECIPE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const getDiets = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3001/types', {})
    dispatch({
      type: GET_DIETS,
      payload: res.data
    })
  }
}

export const createRecipe = (payload) => {
  return async function () {
    const json = await axios.post('http://localhost:3001/recipes', payload)
    return json
  }
}

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  }
}

export const orderByDiets = (payload) => {
  return {
    type: ORDER_BY_DIETS,
    payload,
  }
}

export const orderByScore = (payload) => {
  return {
    type: ORDER_BY_SCORE,
    payload,
  }
}

