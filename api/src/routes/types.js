const { Router } = require('express');
const { getAllDiets } = require('./allData')

const router = Router();

router.get('/', getAllDiets);




module.exports = router;