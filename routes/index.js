const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => res.render('index'))

router.get('/profile', (req, res, next) => res.render('profile'))
router.post('/profile', (req, res, next) => res.render('profile'))

router.get('/create', (req, res, next) => res.render('create'))

router.get('/classDetail', (req, res, next) => res.render('classDetail'))

module.exports = router

