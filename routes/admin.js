var express = require('express');
var router = express.Router();
const {redirectHome, redirectLogin} = require('../middleware/redirect');
/* GET home page. */
router.get('/admin', /* redirectLogin, */  function(req, res, next) {
  res.render('admin/dashboard');
});



module.exports = router;
