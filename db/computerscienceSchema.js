var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var computerScienceSchema = new Schema({
    mul:{type:Boolean,required: true},
    question: {type:String,unique: true},
    as: Array,
    sa: String
});

var computerScience= mongoose.model('computerscience', computerScienceSchema);
module.exports = computerScience
