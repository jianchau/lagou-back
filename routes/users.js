var express = require('express');
var router = express.Router();

var getCode = require('../common/verifycode')
var controller = require('../controller/users')
/* GET users listing. */

router.post('/register',controller.regist);
router.get('/verifycode',getCode)
router.post('/login',controller.login);
router.post('/logout',function(req,res,next){
  res.send('<script>alert("登出待处理");</script>')
})


module.exports = router;
