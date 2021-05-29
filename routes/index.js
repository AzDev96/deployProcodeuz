var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize')
const portfSayt = require('../models').PortfolioSayt
const portfBrend = require('../models').PortfolioBrend
const portfLogo = require('../models').PortfolioLogo
const Op = Sequelize.Op



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('app/index', { 
    title: 'Разработка это наша Жизнь',
  });
});

router.get('/projectWeb', function(req, res, next) {
  res.render('app/projectWeb', { 
    title: 'Разработка Веб-Сайтов',
  });
});


router.get('/deseginer', function(req, res, next) {
  res.render('app/deseginer', { 
    title: 'Дизайн и Брендинг',
  });
});



router.get('/portfolio', async function(req, res, next) {

  var sayts = await portfSayt.findAll() 
  var brends = await portfBrend.findAll() 
  var logos = await portfLogo.findAll() 

  res.render('app/portfolio', { 
    title: 'Портфолио',
    sayts : sayts,
    brends:brends,
    logos:logos
  });
});

router.get('/aboutUs', function(req, res, next) {
  res.render('app/aboutUs', { 
    title: 'О нас'
  });
});


module.exports = router;
