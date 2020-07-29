var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String, required: true, unique: true},
    password: {type:String,required: true},
    score: {
        physic:{grade: {type: Number, default:0},question:{type:Number,default:0}},
        computerscience: {grade:{type: Number,default:0}, question:{type: Number,default:0}}
    }
});

var User = mongoose.model('user', userSchema);
module.exports = User
