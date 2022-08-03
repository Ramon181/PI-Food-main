const axios = require('axios');
const { Recipe, Diet } = require('../db');
// const Op = require('sequelize')
const { API_KEY } = process.env;

const getAllRecipes = async () => {
    let recipe = []
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map((e) => {
        return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            score: e.spoonacularScore,
            dishTypes: e.dishTypes.map(t=> {return{ name: t}}),
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((s) => s.step),
            image: e.image,
            diets: e.diets.map((d) => {
                return { name: d };
            }),
        };
    });
    const recipeDb = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] }
        }
    }, { raw: true, })
    recipe = [...apiInfo, ...recipeDb]
    return recipe;
};

const getAllRecipe = async (req, res, next) => {
    const name = req.query.name || '';
    let allRecipes = await getAllRecipes()
    try {
        // Busca por Nombre del Prducto Recipe de la Api y de la db
        if (name) {
            let recipeName = allRecipes.filter(r => r.title.toLowerCase().includes(name.toLowerCase()));
            res.status(200).send(recipeName)
        } else {
            // Hece un Llamado a la Api y a la db para Mostrar a todos los Productos Recipes
            res.status(200).send(allRecipes)
        }
    } catch (error) {
        next(error)
    }
}


// Me muestra un produducto recipe por un id unico

const recipeAllId = async (req, res, next) => {
    try {
        const { id } = req.params;
        let recipeId;
        if (typeof id === 'string' && id.length > 8) {
            recipeId = await Recipe.findByPk(id, {include:Diet})
            res.status(200).send(recipeId)
        } else {
            let { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            recipeId = {
                id: data.id,
                title: data.title,
                summary: data.summary,
                dishTypes: data.dishTypes.map(e=> {return{ name: e}}),
                healthScore: data.healthScore,
                steps: data.analyzedInstructions[0]?.steps.map((s) => s.step),
                image: data.image,
                diets: data.diets.map((d) => {return { name: d }}),
            }
            // recipeId = await ab.filter(e=> e.id == id)

            res.status(200).send(recipeId)
        }
    } catch (error) {
        next(error)
    }
}

const getAllDiets = async (req, res) => {

    let getDiet = [
        "gluten free",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "dairy free",
        "primal",
        "whole 30",
    ]


    getDiet.forEach(e => {
        Diet.findOrCreate({ where: { name: e } })
    });
    const allDiet = await Diet.findAll()
    res.status(200).send(allDiet)
}

// Crea un Producto Recipe Con un id unico

const createRecipe = async (req, res) => {
    try {
        const { title, summary, healthScore, steps, image, createInDb, diets } = req.body;
        let createRecipes = await Recipe.create({
            title, summary, healthScore, steps, image, createInDb
        });
        let dietdb = await Diet.findAll({
            where:{name: diets}
        })

        createRecipes.addDiet(dietdb)
        res.status(200).send(createRecipes)
    } catch (error) {
        res.status(400).send("No Se Pudo Crear Mi Bebito Fui Fui")
    }
   
}





module.exports = {
    getAllRecipe,
    recipeAllId,
    getAllDiets,
    createRecipe,
}
