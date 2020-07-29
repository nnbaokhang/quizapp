var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:{type:String, required: true, unique: true},
    password: {type:String,required: true},
    score: Object
});

var User = mongoose.model('user', userSchema);
module.exports = User
