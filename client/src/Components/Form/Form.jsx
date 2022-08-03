import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getDiets, createRecipe } from '../../Redux/Actions';
import { validation } from '../Error/Errors';
import './Form.css'

const Form = () => {

    const diet = useSelector(state => state.diets);

    let mitad = Math.floor(diet.length / 2)
    const inicio = diet.slice(0, mitad)
    const final = diet.slice(mitad)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    const [input, setInput] = useState({
        title: '',
        image: "",
        healthScore: '',
        summary: '',
        steps: [],
        diets: [],
    })
    const [errors, setErrors] = useState({})

    function handelChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value,
        })
        )
    }

    function handleStep(e) {
        setInput((input) => ({
            ...input,
            steps: [e.target.value],
        }));
        setErrors(validation({
            ...input,
            [e.target.steps]: e.target.value
        }))
    }

    function handleSelect(e) {
        if (input.diets.includes(e.target.value)) {
            setInput({ ...input, diets: input.diets.filter(l => l !== e.target.value) })
        } else {
            setInput((input) => ({
                ...input,
                diets: [...input.diets, e.target.value],
            }));
        }

        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    const onSubmit = (e) => {
        if (!input.title || !input.summary || !input.diets || input.healthScore === 0 || input.healthScore > 100
            || !input.image || !input.steps) {

            e.preventDefault();
            setErrors(validation({
                ...input
            }))
        } else {
            e.preventDefault();
            dispatch(createRecipe(input))
            setInput({
                title: '',
                image: "",
                healthScore: '',
                summary: '',
                steps: '',
                diets: ''
            })
            history.push('/home')


        }
    }

    return (
        <div className='ddd'>

        <form className='signup-container' onSubmit={(e) => onSubmit(e)}>
            <div className='header-form'>
                <div className='image-form'>
                    <h2 >Recipe Creation</h2>
                    <img className='link-form' src='https://static.wixstatic.com/media/32c482_948372ab778c4d1d8cb51921acd761ac~mv2.gif' alt='img' />
                </div>
                <div className='box-form'>
                    <div className='display'>
                        <label className='label_une'>Title</label>
                        <input name="title" type="text" className="feedback-input" placeholder="Title" value={input.title}
                            onChange={(e) => handelChange(e)} />
                        {errors.title ? <p className='errorMessage'>{errors.title}</p> : <div></div>}
                    </div>
                    <div className='form_box'>
                        <div className='display'>
                            <label className='label_une'>HealthScore</label>
                            <input name="healthScore" type="number" className="feedback-input" placeholder="Health Score"
                                value={input.healthScore} onChange={(e) => handelChange(e)} />
                            {errors.healthScore ? (<p className='errorMessage'>{errors.healthScore}</p>) : <div></div>}
                        </div>
                        <div className='display'>
                            <label className='label_une'>Image</label>
                            <input name="image" type="url" className="feedback-input" placeholder="Image"
                                value={input.image} onChange={(e) => handelChange(e)} />
                            {errors.image && (<p className='errorMessage'>{errors.image}</p>)}
                        </div>
                    </div>
                    <div className='form_box'>
                        <div className='display'>
                            <label className='label_une'>Summary</label>
                            <textarea name="summary" className="feedback-input" placeholder="Summary"
                                value={input.summary} onChange={(e) => handelChange(e)} />
                            {errors.summary && (<p className='errorMessage'>{errors.summary}</p>)}
                        </div>
                        <div className='display'>
                            <label className='label_une'>Steps</label>
                            <textarea name="steps" className="feedback-input" placeholder="Steps"
                                value={input.steps} onChange={(e) => handleStep(e)} />
                            {errors.steps && (<p className='errorMessage'>{errors.steps}</p>)}
                        </div>
                    </div>
                    <div className='diett'>
                        <h2>Diets</h2>
                        <div className="radiogroup">
                            <div>
                                {
                                    inicio?.map(e => (
                                        <div key={e.id} className="wrapper">
                                            <input className="state" type="checkbox" name="diets" id={e.name} value={e.name}
                                                onChange={(e) => handleSelect(e)} />
                                            <label className="label" for={e.name}>
                                                <div className="indicator"></div>
                                                <span className="text">{e.name}</span>
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                {
                                    final?.map(e => (
                                        <div key={e.id} className="wrapper">
                                            <input className="state" type="checkbox" name="diets" id={e.name} value={e.name}
                                                onChange={(e) => handleSelect(e)} />
                                            <label className="label" for={e.name}>
                                                <div className="indicator"></div>
                                                <span className="text">{e.name}</span>
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='form-buttons'>
                <button type='submit' class="icon-btn add-btn">
                    <div class="add-icon"></div>
                    <div class="btn-txt">Add Recipe</div>
                </button>
            </div>
        </form>
        </div>
    );
}

export default Form;