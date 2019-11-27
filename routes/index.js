const express = require('express');
const router  = express.Router();
const Course = require('../models/Course')

const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logOut
} = require("../controllers/auth.controller");

router.get('/', (req, res, next) => res.render('index'))

// router.get('/profile', async (req, res, next) => {
//   const courses = await Course.find();
//   res.render('profile', {courses})
// })


module.exports = router

