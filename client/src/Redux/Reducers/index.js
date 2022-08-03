import { GET_ALL_RECIPE, DETAILS_RECIPE,CREATE_RECIPE, SEARCH_RECIPE, GET_DIETS, ORDER_BY_DIETS, ORDER_BY_NAME, ORDER_BY_SCORE } from "../Actions";

const initialState = {
    allRecipes: [],
    diets: [],
    recipesStorage: [],
    detailRecipes: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPE: //Consigue Todas Las Recetas
            return {
                ...state,
                allRecipes: action.payload,
                recipesStorage: action.payload //Guarda las Recetas para usarla en el Filter 
            }
        case DETAILS_RECIPE: // Consigue los Detalle de las Recetas
            return {
                ...state,
                detailRecipes: action.payload
            }
        case SEARCH_RECIPE: // Busca las Recetas Por Nombre
            return {
                ...state,
                allRecipes: action.payload
            }
        case GET_DIETS: // Consigue Todas Las Dietas
            return {
                ...state,
                diets: action.payload,
            }
        case CREATE_RECIPE: // Crea una Nueva Receta
            return { 
                ...state,
                allRecipes: action.payload
            }
        case ORDER_BY_DIETS:
            let allRecipes = state.recipesStorage;
            let getDiets = [];
            allRecipes.forEach(e => {
                if (e.hasOwnProperty('diets') && 
                e.diets.find(d => d.name === action.payload)) {
                    getDiets.push(e)
                }
                
            });
            return{
                ...state,
                allRecipes: getDiets
            }
        case ORDER_BY_NAME:
            let name = action.payload === 'Asc' ?
                state.allRecipes.sort((a, b) => { // el sort Ordena en orden alfabetico
                    if (a.title > b.title) {
                        return 1
                    }
                    if (b.title > a.title) {
                        return -1
                    }
                    return 0
                }) : action.payload ==='Desc' ?
                state.allRecipes.sort((a, b) => {
                    if (a.title > b.title) {
                        return -1
                    }
                    if (b.title > a.title) {
                        return 1
                    }
                    return 0
                }): state.allRecipes

            return {
                ...state,
                allRecipes: name
            }
        case ORDER_BY_SCORE:
            let score = action.payload === 'high' ?
                state.allRecipes.sort((a, b) => { // los ordena segun que puntaje tenga cada receta
                    if (a.healthScore < b.healthScore) {
                        return 1
                    }
                    if (a.healthScore > b.healthScore) {
                        return -1
                    }
                    return 0
                }) : action.payload ==='low'?
                state.allRecipes.sort((a, b) => {
                    if (a.healthScore < b.healthScore) {
                        return -1
                    }
                    if (a.healthScore > b.healthScore) {
                        return 1
                    }
                    return 0
                }):
                state.allRecipes
            return {
                ...state,
                allRecipes: score
            }

        default: return state;

    }
}

export default rootReducer;