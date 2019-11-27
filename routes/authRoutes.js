 
const router = require("express").Router();
const passport = require("passport");
var multer  = require('multer');
const uploadCloud = require("../config/cloudinary");
const catchErrors = require("../middlewares/catchErrors");
var upload = multer();
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
  deleteCourse,
  courseGet
} = require("../controllers/auth.controller");

const { isLoggedIn, isNotLoggedIn } = require('../middlewares/auth.middleware');

router.get("/signup", signupGet);
router.post("/signup", signupPost);

router.get("/login", loginGet);
router.post("/login", loginPost)

router.get("/logout", logOut);

router.get("/create", isLoggedIn ,createCourseGet);
router.post("/create", createCoursePost);

router.get("/profile", isLoggedIn, profileGet);


router.post("/profile/:courseid", upload.none(), updateCourse);

router.get("/profile/:courseId", isLoggedIn ,deleteCourse);

router.get("/course", courseGet)

module.exports = router;
