 
const router = require("express").Router();
const passport = require("passport");
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logOut,
  createCourseGet,
  createCoursePost,
  profileGet,
  showCourses
} = require("../controllers/auth.controller");

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth.middleware');

router.get("/signup", isLoggedIn, signupGet);
router.post("/signup", signupPost);

router.get("/login", isLoggedIn, loginGet);
router.post("/login", loginPost)

router.get("/logout", logOut);

router.get("/create", createCourseGet);
router.post("/create", createCoursePost);

router.get("/profile", profileGet)

router.get("/profile", showCourses);


module.exports = router;
