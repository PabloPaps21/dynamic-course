
const router = require("express").Router();
const {isNotLoggedIn} = require('../middlewares/auth.middleware')


router.get("/profile", isNotLoggedIn, (req,res) => res.render("auth/profile"));

router.get("/amigos", (req, res) => res.send("amigos?"));

module.exports = router