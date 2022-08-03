const { Router } = require('express');
const recipeRoute = require("./recipe");
const dietRoute = require("./types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipeRoute);

router.use('/types', dietRoute);



module.exports = router;
