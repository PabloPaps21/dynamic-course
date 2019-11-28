 
const router = require("express").Router();
const passport = require("passport");
const uploadCloud = require("../config/cloudinary");
const catchErrors = require("../middlewares/catchErrors");
const multer = require("multer")
let upload = multer();
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
  updateCoursePost,
  updateCourseGet,
  deleteCourse,
  courseGet,
  signCoursePost,
  createReview
} = require("../controllers/auth.controller");

const { isLoggedIn, isNotLoggedIn, isConnected} = require('../middlewares/auth.middleware');

router.get("/signup", isConnected,signupGet);
router.post("/signup", signupPost);

router.get("/login", loginGet);
router.post("/login", loginPost)

router.get("/logout", logOut);

router.get("/create", isLoggedIn ,createCourseGet);
router.post("/create", createCoursePost);


router.post("/sign/:id", signCoursePost);
router.post("/review/:id", upload.none(), createReview);

router.get("/profile", isLoggedIn, profileGet);


//router.post("/profile/:courseid", upload.none(), updateCourse);

router.get("/editcourse/:id", isLoggedIn ,updateCourseGet);
router.post("/editcourse/:id",  uploadCloud.single("photoURL") ,updateCoursePost);



router.get("/profile/:courseId", isLoggedIn ,deleteCourse);

router.get("/course", isLoggedIn ,courseGet)

router.get("/course", isLoggedIn ,courseGet)


module.exports = router;
