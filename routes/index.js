const express = require('express');
const router  = express.Router();
const Course = require('../models/Course')
const { isNotLoggedIn, isLoggedIn } = require("../middlewares/auth.middleware")

router.get('/',(req, res, next) => res.render('index'))


module.exports = router

