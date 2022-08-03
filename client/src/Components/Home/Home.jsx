/* eslint-disable no-unused-vars */
// Importa los Frenworks
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

// Importa las Action Creators
import { getAllRecipes, orderByName, orderByScore, orderByDiets } from '../../Redux/Actions';
import './Home.css'

// Importa Los Componentes
import Recipes from '../Recipes/Recipes';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import Form from '../Form/Form';
import Details from '../Details/Details'


const Home = () => {
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.allRecipes)//Trae el estado de Recipes

  const [order, setOrder] = useState('') 
  const [currentPage, setCurrentPage] = useState(1); // Setea la Pagina Actual
  const [recipesPerPege] = useState(9); // Guarda cuantas Recetas Por Pagina

  useEffect(() => {
    dispatch(getAllRecipes());

  }, [dispatch]);

  const indexOfLastRecipe = currentPage * recipesPerPege; // Ultima Receta Por Pagina
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPege; // Aca da la primera Receta por Cada Por Cada Pagina
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);// Muestra todas Las Recetas de la Pagina Principal 

  console.log(recipes)



  const orderName = (e) => {
    if(e.target.value === 'all'){
      dispatch(getAllRecipes())
    }
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  const orderScore = (e) =>{
    if(e.target.value === 'all'){
      dispatch(getAllRecipes())
    }
    dispatch(orderByScore(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  const orderDiets = (e) => {
    if (e.target.value === 'all'){
      dispatch(getAllRecipes())
    }
      dispatch(orderByDiets(e.target.value, currentRecipes.diets))
      setCurrentPage(1)
      setOrder(`Ordenado ${e.target.value}`) 
      
}

const resetHome = (e) => {
  dispatch (getAllRecipes())
  setCurrentPage(1)
}







  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='home_body'>
      <NavBar orderName={orderName} orderScore={orderScore} orderDiets={orderDiets} resetHome={resetHome} setCurrentPage={setCurrentPage} currentRecipes={currentRecipes}/>
      <Route path='/home/details/:id' component={Details} />
      <Route exact path='/home/create' component={Form} />
      <Route exact path='/home'>
        <Recipes currentRecipes={currentRecipes} className='recipes_home'/>
        <Pagination recipesPerPege={recipesPerPege} totalRecipes={recipes.length} paginate={paginate} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </Route>
    </div>
  );
}

export default Home;
