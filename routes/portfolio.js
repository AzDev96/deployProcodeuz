const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const portfSayt = require('../models').PortfolioSayt
const portfBrend = require('../models').PortfolioBrend
const portfLogo = require('../models').PortfolioLogo
const Op = Sequelize.Op

/* GET home page - portfolioSayt */
router.get('/admin/portfolioSayt-add', function(req, res, next) {
  res.render('admin/portfolioSayt-add');
});

/* POST  - portfolioSayt  */
router.post('/admin/portfolioSayt-add', function (req, res, next) {
   if(!req.files) {
     req.flash("error", "пожалуйста, загрузите какой-нибудь файл!")
   }else{
     var image_attr = req.files.cover_image
     var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];
     if(valid_images_extensions.includes(image_attr.mimetype)){
        image_attr.mv("./public/uploads/" + image_attr.name)
        portfSayt.create({
          title: req.body.title,	
          text: req.body.text,	
          cover_img: "/uploads/" + image_attr.name,	
          silka: req.body.silka,
        }).then((data) => {
          if(data) {
            req.flash("success", "Портфолио Сайта Сахранился Удачно!!")
          }
          else{
            req.flash("error", "Портфолио Сайта неудачно сахранился")
          }
          res.redirect("/admin/portfolioSayt-add")
        })
     }else{
       req.flash("error", "выбран неверный файл")
       res.redirect('/admin/portfolioSayt-add')
     }
    
   }
})

/* POST  - portfBrend  */
router.post('/admin/portfolioBrend-add', function (req, res, next) {
   if(!req.files) {
     req.flash("error", "пожалуйста, загрузите какой-нибудь файл!")
   }else{
      var image_attr = req.files.cover_image
      var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];
      if(valid_images_extensions.includes(image_attr.mimetype)){
        image_attr.mv("./public/uploads/" + image_attr.name)
        portfBrend.create({
          title: req.body.title,	
          text: req.body.text,	
          cover_img: "/uploads/" + image_attr.name,	
          silka: req.body.silka,
        }).then((data) => {
          if(data) {
            req.flash("success", "Портфолио Брендбука Сахранился Удачно!!")
          }
          else{
            req.flash("error", "Портфолио Брендбука неудачно сахранился")
          }
          res.redirect("/admin/portfolioSayt-add")
        })
      }else{
        req.flash("error", "выбран неверный файл")
        res.redirect('/admin/portfolioSayt-add')
      }
   }
})

/* POST  - portfLogo  */
router.post('/admin/portfolioLogo', function (req, res, next) {
   if(!req.files) {
     req.flash("error", "пожалуйста, загрузите какой-нибудь файл!")
   }else{
      var image_attr = req.files.cover_image
      var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];
      if(valid_images_extensions.includes(image_attr.mimetype)){
        image_attr.mv("./public/uploads/" + image_attr.name)
        portfLogo.create({
          title: req.body.title,	
          text: req.body.text,	
          cover_img: "/uploads/" + image_attr.name,	
          silka: req.body.silka,
        }).then((data) => {
          if(data) {
            req.flash("success", "Портфолио Лого Сахранился Удачно!!")
          }
          else{
            req.flash("error", "Портфолио Лого неудачно сахранился")
          }
          res.redirect("/admin/portfolioSayt-add")
        })
      }else{
        req.flash("error", "выбран неверный файл")
        res.redirect('/admin/portfolioSayt-add')
      }
   }
})



// ======== СПИСОК ПОРТФОЛИО  ========
router.get('/admin/portfolioSayt-list', async function(req, res, next) {

  var sayts = await portfSayt.findAll() 
  var brends = await portfBrend.findAll() 
  var logos = await portfLogo.findAll() 


  res.render('admin/portfolioSayt-list', {
    sayts : sayts,
    brends:brends,
    logos:logos
  });
});


/* Редактирование Портфолио Сайта  */
router.get("/admin/edit-portfoliosayt/:saytId", async function (req, res, next){ 
  var sayt_data = await portfSayt.findOne({
     where:{
       id:{
         [Op.eq] : req.params.saytId
       }
     }
  })
  res.render("admin/edit-portfoliosayt", {
      sayt : sayt_data,
  })
})

router.post("/admin/edit-portfoliosayt/:saytId",  function (req, res, next){ 
    if(!req.files) {
      portfSayt.update({
        title: req.body.title,	
        text: req.body.text,	
        silka: req.body.silka,
      }, {
        where: {
          id:{
            [Op.eq] : req.params.saytId
          }
        }
      }).then(data => {
        if(data) {
          req.flash("success", "Редактирование успешно завершено портфолио сайта!!")

        }else{
          req.flash("error", "Не удалось обновить портфолио сайта!")
        }
        res.redirect('/admin/edit-portfoliosayt/'+ req.params.saytId)
      })
    }else{
      var image_attr = req.files.cover_image;

      var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];

      if(valid_images_extensions.includes(image_attr.mimetype)){
        image_attr.mv("./public/uploads/" + image_attr.name)

        portfSayt.update({
          title: req.body.title,	
          text: req.body.text,	
          cover_img: "/uploads/" + image_attr.name,	
          silka: req.body.silka,
        }, {
          where: {
            id: {
              [Op.eq] : req.params.saytId
            }
          }
        }).then((data) => {
          if(data) {
            req.flash("success", "Портфолио Сайта удачно Редактирован")
          }
          else{
            req.flash("error", "Портфолио Сайта неудачно Редактирован")
          }
          res.redirect("/admin/edit-portfoliosayt/" + req.params.saytId)
        })
      }else{
        req.flash("error", "выбран неверный файл")
        res.redirect("/admin/edit-portfoliosayt/" + req.params.saytId)
      }
    }
})
// Удалить!!!!
router.get('/admin/delete-sayt/:id', async (req, res, next) => {
  let sayt = await portfSayt.findOne()
  try{
    await sayt.destroy({where:{id:req.params.id}});
    req.flash('success', "Вы Успешно Удалили! Портфолио Сайта")
    res.redirect('/admin/portfolioSayt-list');
  }catch(e) {
    req.flash('error', "Нельзя удалить есть Ошибка!")
    res.redirect('/admin/portfolioSayt-list');
  }
  
});



/* Редактирование Брендбук  */
router.get("/admin/edit-brendbuk/:brendId", async function (req, res, next){ 
  var brend_data = await portfBrend.findOne({
     where:{
       id:{
         [Op.eq] : req.params.brendId
       }
     }
  })
  res.render("admin/edit-brendbuk", {
      brend : brend_data,
  })
})
router.post("/admin/edit-brendbuk/:brendId", function (req, res, next){ 
  if(!req.files) {
    portfBrend.update({
      title: req.body.title,	
      text: req.body.text,	
      silka: req.body.silka,
    }, {
      where: {
        id:{
          [Op.eq] : req.params.brendId
        }
      }
    }).then(data => {
      if(data) {
        req.flash("success", "Редактирование успешно завершено Брендбука")

      }else{
        req.flash("error", "Не удалось обновить Брендбука!")
      }
      res.redirect('/admin/edit-brendbuk/'+ req.params.brendId)
    })
  }else{
    var image_attr = req.files.cover_image
    var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];
    if(valid_images_extensions.includes(image_attr.mimetype)){
      image_attr.mv("./public/uploads/" + image_attr.name)
      portfBrend.update({
        title: req.body.title,	
        text: req.body.text,	
        cover_img: "/uploads/" + image_attr.name,	
        silka: req.body.silka,
      }, {
        where: {
          id: {
            [Op.eq] :req.params.brendId
          }
        }
      }).then((data) => {
        if(data) {
          req.flash("success", "Брендук удачно Редактирован")
        }
        else{
          req.flash("error", "Брендук неудачно Редактирован")
        }
        res.redirect("/admin/edit-brendbuk/" + req.params.brendId)
      })
    }else{
      req.flash("error", "выбран неверный файл")
      res.redirect("/admin/edit-brendbuk/" + req.params.brendId)
    }
  }
})
// Удалить!!!!
router.get('/admin/delete-brend/:id', async (req, res, next) => {
  let brend = await portfBrend.findOne()
  try{
    await brend.destroy({where:{id:req.params.id}});
    req.flash('success', "Вы Успешно Удалили! Портфолио Брендбука")
    res.redirect('/admin/portfolioSayt-list');
  }catch(e) {
    req.flash('error', "Нельзя удалить есть Ошибка!")
    res.redirect('/admin/portfolioSayt-list');
  }
  
});


/* Редактирование Лого  */
router.get("/admin/edit-logo/:logodId", async function (req, res, next){ 
  var Logo_data = await portfLogo.findOne({
     where:{
       id:{
         [Op.eq] : req.params.logodId
       }
     }
  })
  res.render("admin/edit-logo", {
      logo : Logo_data,
  })
})

router.post("/admin/edit-logo/:logodId", function (req, res, next){ 
  if(!req.files) {
    portfLogo.update({
      title: req.body.title,	
      text: req.body.text,	
      silka: req.body.silka,
    }, {
      where: {
        id:{
          [Op.eq] : req.params.logodId
        }
      }
    }).then(data => {
      if(data) {
        req.flash("success", "Редактирование успешно завершено Лого")

      }else{
        req.flash("error", "Не удалось обновить Лого!")
      }
      res.redirect('/admin/edit-logo/'+ req.params.logodId)
    })
  }else{
    var image_attr = req.files.cover_image
    var valid_images_extensions = ['image/png', 'image/jpg', 'image/jpeg'];
    if(valid_images_extensions.includes(image_attr.mimetype)){
      image_attr.mv("./public/uploads/" + image_attr.name)
      portfLogo.update({
        title: req.body.title,	
        text: req.body.text,	
        cover_img: "/uploads/" + image_attr.name,	
        silka: req.body.silka,
      }, {
        where: {
          id: {
            [Op.eq] :req.params.logodId
          }
        }
      }).then((data) => {
        if(data) {
          req.flash("success", "Лого удачно Редактирован")
        }
        else{
          req.flash("error", "Лого неудачно Редактирован")
        }
        res.redirect("/admin/edit-logo/" + req.params.logodId)
      })
    }else{
      req.flash("error", "выбран неверный файл")
      res.redirect("/admin/edit-logo/" + req.params.logodId)
    }
  }
})

// Удалить!!!!
router.get('/admin/delete-logo/:id', async (req, res, next) => {
  let logo = await portfLogo.findOne()
  try{
    await logo.destroy({where:{id:req.params.id}});
    req.flash('success', "Вы Успешно Удалили! Портфолио Лого")
    res.redirect('/admin/portfolioSayt-list');
  }catch(e) {
    req.flash('error', "Нельзя удалить есть Ошибка!")
    console.log(e)
  }
  
  res.redirect('/admin/portfolioSayt-list');
});


module.exports = router;
