var express = require('express');
var multer = require('multer')
var router = express.Router();
var upload = multer({ dest: 'public/uploads/'});
var controllerAdmin = require('../controller/admin')
router.post('/postadd',upload.single('companyLogo'),controllerAdmin.add)
router.post('/postupdate/:id',upload.single('companyLogo'),controllerAdmin.update)
router.get('/postremove',controllerAdmin.remove)
module.exports = router;