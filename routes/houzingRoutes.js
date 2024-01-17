const { Router } = require("express");

const router = Router();

const { getRecomendedHouses } = require("../controllers/houzingController");

router.get('/recomended' , getRecomendedHouses)

module.exports = router