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

router.get('/profile', async (req, res, next) => {
  const courses = await Course.find();
  res.render('profile', {courses})
})

router.get('/create', (req, res, next) => res.render('create'))

router.post('/create', (req, res, next) => {
  const {title, category, description} = req.body;
  const course = new Course({title, category, description})
  course.save();
  res.redirect('/profile');
})

router.get('/classDetail', (req, res, next) => res.render('classDetail'))

module.exports = router

