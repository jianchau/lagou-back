var mongoose = require('mongoose')
    var usersSchema = mongoose.Schema({
        username:{type:String,required:true,unique:true},
        password:{type:String,required:true,unique:true}
    })
    var usersModel = mongoose.model('user',usersSchema);
module.exports=usersModel;