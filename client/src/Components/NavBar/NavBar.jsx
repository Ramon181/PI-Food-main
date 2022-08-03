import React from 'react'
import { Link } from 'react-router-dom';
import SerchBar from '../SerchBar/SerchBar';
import cooking from './img/cooking.png';
import './NavBar.css'

const NavBar = ({ orderName, orderScore, orderDiets, resetHome, setCurrentPage, currentRecipes }) => {

    return (
        <div>
            <div className='nav-body'>
                <div className='nav-header'>
                    <Link to='/home' onClick={e => resetHome(e)} ><img src={cooking} alt='img' width='50px' height='50px' /></Link>
                    <Link to='/home' className='nav-link' onClick={e => resetHome(e)} ><h3>Home</h3> </Link>
                    <Link to='/home/create' className='nav-link' ><h3>Create</h3></Link>
                    <div className='content-select'>
                        <select onChange={(e) => orderName(e)}>
                            <option value='all'>All</option>
                            <option value='Asc'>Asc</option>
                            <option value='Desc'>Desc</option>
                        </select>
                        <i></i>
                    </div>
                    <div className='content-select'>
                        <select onChange={(e) => orderScore(e)}>
                            <option value='all'>All</option>
                            <option value='high'>High</option>
                            <option value='low'>Low</option>
                        </select>
                        <i></i>
                    </div>
                    <div className='content-select'>
                        <select onChange={(e) => orderDiets(e)}>
                            <option value='all'>All Recipe</option>
                            <option value="gluten free">Gluten Free</option>
                            <option value="ketogenic">Ketogenic</option>
                            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="pescatarian">Pescatarian</option>
                            <option value="dairy free">Dairy Free</option>
                            <option value="primal">Primal</option>
                            <option value="whole 30">Whole 30</option>
                        </select>
                        <i></i>
                    </div>
                </div>
                <SerchBar setCurrentPage={setCurrentPage} currentRecipes={currentRecipes} />
            </div>


            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <div className='linkes'>
                            <Link className='nav-link' onClick={e => resetHome(e)} to='/home'><h3>Home</h3></Link>
                            <Link className='nav-link' to='/home/create'><h3>Create</h3></Link>
                        </div>
                        <div className='content-select'>
                            <select onChange={(e) => orderName(e)}>
                                <option value='all'>All</option>
                                <option value='Asc'>Asc</option>
                                <option value='Desc'>Desc</option>
                            </select>
                            <i></i>
                        </div>
                        <div className='content-select'>
                            <select onChange={(e) => orderScore(e)}>
                                <option value='all'>All</option>
                                <option value='high'>High</option>
                                <option value='low'>Low</option>
                            </select>
                            <i></i>
                        </div>
                        <div className='content-select'>
                            <select onChange={(e) => orderDiets(e)}>
                                <option value='all'>All Recipe</option>
                                <option value="gluten free">Gluten Free</option>
                                <option value="ketogenic">Ketogenic</option>
                                <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescatarian">Pescatarian</option>
                                <option value="dairy free">Dairy Free</option>
                                <option value="primal">Primal</option>
                                <option value="whole 30">Whole 30</option>
                            </select>
                            <i></i>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>

    );
}

export default NavBar;