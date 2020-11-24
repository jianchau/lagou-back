var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/index')
/* GET home page. */
router.get('/login', controllerIndex.login);
router.get('/register',controllerIndex.regist);
router.get('/admin',controllerIndex.admin)
router.get('/adminadd',controllerIndex.adminadd)
router.get('/adminedit/:page',controllerIndex.adminedit);
router.get('/adminupdate/:_id/:page',controllerIndex.adminupdate);
router.get('*',function(err,res,next){
  res.redirect('/login')
})

module.exports = router;
