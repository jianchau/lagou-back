var mongoose = require('mongoose');

var positionSchema = mongoose.Schema({
    postName:{type:String,required:true},
    postCity:{type:String,required:true},
    postMoney:{type:String,required:true},
    postYear:{type:String,required:true},
    postEdu:{type:String,required:true},
    companyName:{type:String,required:true},
    companyLogo:{type:String,required:true},
    postMessage:{type:String,required:true},
    postTime:{type:Date,default:''}
})
var positionModel = mongoose.model('positions',positionSchema)

module.exports = positionModel;