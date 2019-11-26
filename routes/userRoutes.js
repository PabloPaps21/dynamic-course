
const router = require("express").Router();
const {isNotLoggedIn} = require('../middlewares/auth.middleware')

router.get("/profile", isNotLoggedIn, (req,res) => res.send("este es la casa del usuario"));

router.get("/amigos", (req, res) => res.send("amigos?"));

module.exports = router