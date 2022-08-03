import React, { useEffect } from 'react';
import { detailsRecipe } from '../../Redux/Actions'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Detalle.css'


const Details = () => {
    const dispatch = useDispatch();
    const details = useSelector(state => state.detailRecipes)
    const { id } = useParams()

    useEffect(() => {
        dispatch(detailsRecipe(id))
    }, [dispatch, id])
    console.log(details)

    if (!details.id) {
        return (
            <div className='loader-div'>
                <span class="loader-details"></span>
            </div>
        )
    }


    return (
        <div className="details_body">
            <div className='details_box'>
                <div className='card'>
                    <div className="thumbnail">
                        <img className="left" src={details.image} alt='img' />
                    </div>
                    <div className='right'>
                        <h2 className='title-details'>{details.title}</h2>
                        <div className="separator"></div>
                        <div className='details-div'>
                            <div className='details-diets'>
                                <h3 className='title-une'>Diets</h3>
                                {details.diets?.map((e, i) => <p key={i} className='une'>{e.name}</p>)}
                            </div>
                            <div>
                                <h3 className='title-tho'>Dish Types</h3>
                                {details.dishTypes?.map((e, i) => <p key={i} className='tho'>{e.name}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className='score'>{details.healthScore}</h5>
            <h6 className='h-score'>Health Score</h6>
            <div className='details-botton'>
                <div className="notepad">
                    <div className='top'><h2>Summary</h2></div>
                    <div className='paper'>
                        <p dangerouslySetInnerHTML={{ __html: details.summary }} />
                    </div>
                </div>
                <div className="notepad">
                    <div className='top'><h2>Step By Step</h2></div>
                    <div className='paper'>
                        <p>{details.steps}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;