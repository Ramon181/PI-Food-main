import React, { useState } from 'react'
import Card from '../Card/Card'

import './Recipes.css'


const Recipes = ({ currentRecipes}) => {

    if(!currentRecipes.length){
        return(
            <div className='loader-box'>
                <span className="loader"></span>
                <span className="loader"></span>
                <span className="loader"></span>
                <span className="loader"></span>
                <span className="loader"></span>
                <span className="loader"></span>
            </div> 
        )
    }

    return (
        <div className='recipes-body'>
            {
                currentRecipes?.map(e => {
                   return(
                       <Card key={e.id} 
                       title={e.title} 
                       image={e.image} 
                       diets={e.diets} 
                       types = {e.dishTypes}
                       id={e.id} />
                   )
                })
            }
        </div>
    )
}

export default Recipes