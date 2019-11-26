const express = require('express');
const router  = express.Router();

const {
  signupGet,
  signupPost,
  loginGet,
  profileGet,
  userToken
} = require("../controllers/auth.controller");

const {
  isLoggedIn,
  isNotLoggedIn,
} = require("../middlewares/auth.middleware");


const {
  sendEmailView, sendEmail
} = require('../controllers/email');


const passport = require("../config/passport");

router.get("/",(req, res, next) => res.render("index"));

//signup 

router.get("/signup", signupGet);
router.post("/signup", signupPost);

//login

router.get("/login", isNotLoggedIn, loginGet);
router.post("/login", (req,res,next) => {
  passport.authenticate("local", (err, user, info) => {
    if(err) {
      return next(err);
    }
    if(!user){
      return res.redirect("/login"); 
    }
    req.logIn(user, err => {
      if(err){
        return next(err);
      }
    })
  }) (req, res, next);
})


router.get("profile", isNotLoggedIn, profileGet);

router.get("/logout", (req,res,next)=> {
  req.logout();
  res.redirect("/login");
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//ruta a token 
router.get("/confirm/:token", userToken);

module.exports = router