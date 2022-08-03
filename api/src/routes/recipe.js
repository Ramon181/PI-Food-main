const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const { getAllRecipe, recipeAllId, createRecipe,  } = require('./allData')

const router = Router();

router.get('/', getAllRecipe)

router.post('/', createRecipe);

router.get('/:id', recipeAllId)


module.exports = router;