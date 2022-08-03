import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'


const Card = ({ title, image, diets, id, types }) => {


    return (

        <div className='cart-body'>
            
            <div className='carta-box'>
                <img src={image} alt='img' className='cart-image' />
                <div className='card-link'>
                    <Link to={`/home/details/${id}`}>
                        <button className='cart-button'>
                            <span>View</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className='cart-header'>
                <h3 className='cart-title'>{title}</h3>
                <div className='card-diet-type'>
                    <div className='first'>
                        <h3 className='title-diets'>Diets</h3>
                        <div className='card-ul'>
                            {diets.map(e => <li key={e.name} className='cart-diets'>{e.name}</li>)}
                        </div>
                    </div>
                    <div className='first'>
                        <h3 className='title-diets'>Types</h3>
                        <div className='card-ul'>
                            {types ? types.map(e => <li key={e.name} className='cart-diets'>{e.name}</li>): <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;

// imagen
// Nombre
// Tipo de dieta