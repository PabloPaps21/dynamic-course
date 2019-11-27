const express = require('express');
const router  = express.Router();
const Course = require('../models/Course')

router.get('/', (req, res, next) => res.render('index'))

// router.get('/profile', async (req, res, next) => {
//   const courses = await Course.find();
//   res.render('profile', {courses})
// })


module.exports = router

