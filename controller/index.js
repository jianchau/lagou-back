var positionModel = require('../model/positions')
var regist = (req,res,next)=>{
    res.render('register');
}

var login = (req,res,next)=>{
    res.render('login');
}

var admin = (req,res,next)=>{
    if(req.session.username)
    res.render('admin',{
        username:req.session.username
    })
    else res.redirect('login')
}

var adminadd = (req,res,next)=>{
    if(req.session.username)
    res.render('adminadd',{
        username:req.session.username,
    })
    else res.redirect('login')
}

var adminedit = (req,res,next)=>{
    var page = Number(req.params.page);
    var count=6;
    if(req.session.username){
        Promise.all([
            positionModel.find().sort({postTime:-1}).skip((page-1)*count).limit(count),
            positionModel.find().count()
        ])
        .then(infos=>{
            res.render('adminedit',{
                username:req.session.username,
                infos:infos[0],
                total:infos[1],
                page,
                page_count:Math.ceil((infos[1]/count))
            })
        }).catch(err=>console.log(err))  
    }
    else res.redirect('login')
}

var adminupdate = (req,res,next)=>{
    var id = req.params._id;
    var page = req.params.page;
    positionModel.findOne({_id:id}).then(info=>{
        if(info.length!==0){
            res.render('adminupdate',{
                username:req.session.username,
                info,
                page
            })
        }
    }).catch(err=>console.log(err))
}

module.exports = {regist,login,admin,adminadd,adminedit,adminupdate}
