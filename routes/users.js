var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var Op = Sequelize.Op;

var userModel = require('../models').Users
/* GET users listing. */
router.get('/admin/users-add', function(req, res, next) {
  res.render('admin/user-add');
});

// Добавить пользователя
router.post('/admin/users-add', function(req, res, next) {

  userModel.findOne({
    where:{
      email: {
        [Op.eq]: req.body.email
      }
    }
  }).then(data => {
    if(data) {
        req.flash("error", "Адрес электронной почты уже существует")
        res.redirect("/admin/users-add")
    }else{
      userModel.create({
        name: req.body.name,	
        password: req.body.password,
        email: req.body.email,	
        adress: req.body.adress,
        mobile: req.body.mobile,
      }).then(data => {
        if(data) {
          req.flash('success', "Пользователь был создан")
          res.redirect("/admin/users-add")
        }else{
          req.flash("error", "Не удалось сохранить пользователей")
          res.redirect("/admin/users-add")
        } 
      })
    }
  })



 
});

// Список пользователей
router.get("/admin/list-user", async function (req, res) {
  var user_data = await userModel.findAll();
  res.render("admin/list-user", {
    users : user_data
  })
})

// Редактировать Пользователя
router.get("/admin/edit-user/:userId", async function(req, res) {
  var userData = await userModel.findOne({
    where:{
      id:{
        [Op.eq]: req.params.userId
      }
    }
  });
  res.render("admin/edit-user", {
    user: userData
  })
})
router.post("/admin/edit-user/:userId", async function(req, res) {
  userModel.update({
        name: req.body.name,	
        password: req.body.password,
        email: req.body.email,	
        adress: req.body.adress,
        mobile: req.body.mobile,
  }, {
    where:{
      id:{
        [Op.eq]: req.params.userId
      }
    }
  }).then(data => {
    if(data) {
      req.flash('success', "Пользователь успешно Редактировано")  
    }else{
      req.flash('error', "Не удалось обновить пользователя")
    }
    res.redirect('/admin/edit-user/' + req.params.userId)
  })
})
// Удалить!!!!
router.get('/admin/delete-user/:id', async (req, res, next) => {
  let logo = await userModel.findOne()
  try{
    await logo.destroy({where:{id:req.params.id}});
    req.flash('success', "Вы Успешно Удалили! Пользовотеля")
    res.redirect('/admin/list-user');
  }catch(e) {
    req.flash('error', "Нельзя удалить есть Ошибка!")
    console.log(e)
  }
  
  res.redirect('/admin/list-user');
});




module.exports = router;
