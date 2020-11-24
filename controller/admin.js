var fs = require('fs');
var path = require('path')
var positionModel = require('../model/positions')

var add = (req,res,next)=>{
    var data = {
        ...req.body,
        postTime:Date.now(),
        companyLogo:'http://localhost:3000/uploads/'+ req.file.filename+'.jpg'
    }
    try{
        fs.renameSync(path.join('./public/uploads',req.file.filename),path.join('./public/uploads',req.file.filename+'.jpg'));
    }catch(err){
        console.log(err)
    }
    positionModel(data).save().then(info=>{
        if(info.length!==0){
            res.send('<script>alert("添加职位成功");history.back();</script>')
        }
    }).catch(err=>{
        res.send('<script>alert("添加职位失败");history.back()</script>')
    })
}

var update = (req,res,next)=>{
    var id = req.params.id;
    var body = req.body;
    var file = req.file;
    positionModel.findOne({_id:id}).then(info=>{
        if(info){
            console.log(info.companyLogo)
            if(file){
                var prevLogo = info.companyLogo.replace(/http:\/\/localhost:3000\//,'./public/');
                fs.unlinkSync(prevLogo,function(err,res){
                    if(err){
                        console.log(err);
                        return;
                    }
                })
                var data = {
                    ...req.body,
                    postTime:Date.now(),
                    companyLogo:'http://localhost:3000/uploads/'+ req.file.filename+'.jpg'
                }
                try{
                    fs.renameSync(path.join('./public/uploads',req.file.filename),path.join('./public/uploads',req.file.filename+'.jpg'));
                }catch(err){
                    console.log(err)
                }
                positionModel(data).save().then(info=>{
                    if(info.length!==0){
                        res.send('<script>alert("更新职位成功");history.back();</script>')
                    }
                }).catch(err=>{
                    res.send('<script>alert("更新职位失败");history.back()</script>')
                })
            }else{
                positionModel.update({_id:id},{$set:body}).then(info=>{
                    res.send('<script>alert("更新成功");location.back();</script>');
                }).catch(err=>{
                    console.log(err)
                })
                
            }
        }
    })
    
}

var remove = (req,res,next)=>{
    console.log(req)
}

module.exports = {add,update,remove}