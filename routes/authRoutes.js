 
const router = require("express").Router();
const passport = require("passport");
var multer  = require('multer');
var upload = multer()
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logOut,
  createCourseGet,
  createCoursePost,
  profileGet,
  updateCourse,
  deleteCourse
} = require("../controllers/auth.controller");

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth.middleware');

router.get("/signup", isLoggedIn, signupGet);
router.post("/signup", signupPost);

router.get("/login", isLoggedIn, loginGet);
router.post("/login", loginPost)

router.get("/logout", logOut);

router.get("/create", createCourseGet);
router.post("/create", createCoursePost);

router.get("/profile", isLoggedIn, profileGet);


router.post("/profile/:courseid", upload.none(), updateCourse);

router.get("/profile/:courseId", deleteCourse);

module.exports = router;
