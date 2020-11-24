var getCrypto = require('../common/crypto')
var usersModel = require('../model/users')
function regist(req,res,next){
    var {username,password1} = req.body; 
    usersModel.find({'username':username}).then(info=>{
        if(info.length>=1){
            res.send('<script>alert("该用户名已被注册");location.href="/login"</script>') 
            return;
        }
    }).catch(err=>console.log(err))
    usersModel({
        username,
        password:getCrypto(password1)
    }).save().then(info=>{
        res.send('<script>alert("注册成功");location.href="/login"</script>')
    }).catch(err=>{
        res.send('<script>alert("注册失败");location.href="/register"</script>')
    })
}

function login(req,res,next){
    usersModel.findOne({
        username:req.body.username
    }).then(info=>{
        if(info.length===0){
            res.send('<script>alert("用户名不存在");history.back();</script>');
            return;
        }
        else if(info.password!==getCrypto(req.body.password)){
            res.send('<script>alert("密码输入错误");history.back();</script>');
            return;
        }
        else if(req.session.captcha.toLowerCase()!==req.body.verifycode.toLowerCase()){
            res.send('<script>alert("验证码输入错误");history.back();</script>');
            return;
        }
        else{
            req.session.username = req.body.username;
            res.send('<script>alert("登录成功");location.href="/admin"</script>');
            return;
        }
    }).catch(err=>{
        console.log(err);
    })
}

module.exports = {regist,login}
