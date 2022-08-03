import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipes, getAllRecipes} from '../../Redux/Actions'
import './SerchBar.css'

const SerchBar = ({setCurrentPage, currentRecipes}) => {

    const [name, setName] = useState('')

    const dispatch = useDispatch();

    const change = (e) => {
        if(e === '' ){
            dispatch(getAllRecipes())
        }
        setName(e);
        dispatch(searchRecipes(name))
    }

    const submit = (e) => {
        if (!currentRecipes.length) {
            e.preventDefault();
            dispatch(getAllRecipes())
            return alert('There is no Recipe')
        }
        e.preventDefault();
        dispatch(searchRecipes(name));
        setCurrentPage(1)
        setName('')
    }

    return (
        <div className='search_body'>
        <form onSubmit={e=>submit(e)} className="search">
            <input type="text" className="search__input" value={name} placeholder="Search" onChange={(e)=>change(e.target.value)}/>
            <button type='submit' className="search__button">
                <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
            </button>
        </form>
        </div>
    )
}

export default SerchBar;