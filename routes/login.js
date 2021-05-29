const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt');

const adminModel = require('../models').Admin
const Op = Sequelize.Op

const {redirectHome, redirectLogin} = require('../middleware/redirect');


/* GET home page. */
router.get('/admin/login', redirectHome, function(req, res, next) {
  res.render('login');
});

/* POST  */
router.post('/admin/login', function(req, res, next) {
    adminModel.findOne({
        where:{
            email: {
                [Op.eq]: req.body.email
            }
        }
    }).then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, function (error, result) {
                if(result) {
                    req.session.isLoggedIn = true;
                    req.session.userId = user.id
                    console.log(req.session)
                    res.redirect("/admin")
                }else{
                    req.flash("error", "Неверные учетные пароль")
                    res.redirect("/admin/login")
                }
            })
        }else{
            req.flash("error", "Токого пользователя нет емаил ошибка!")
            res.redirect("/admin/login")
        }
    })
  });

router.get('/admin/register', function (req, res) {
    adminModel.create({
        name: "Azizbek",	
        email: "admin@gmail.com",	
        password: bcrypt.hashSync("123456", 10)
    }).then(data => {
        if(data) {
            res.json({
                status: 1,
                message:"Admin"
            })
        }else{
            res.json({
                status: 0
            })
        }
    })
})

router.get("/admin/logout", redirectLogin, function (req, res) {
    req.session.destroy((error) => {
        if(error) {
            res.redirect("/admin")
        }
        res.redirect("/admin/login")
    })
})

module.exports = router;
