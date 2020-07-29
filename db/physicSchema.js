var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var physicSchema = new Schema({
         mul:{type:Boolean,required: true},
         question: {type:String,unique: true},
         as: Array,
         sa: String
});

var physicSchema = mongoose.model('physic', physicSchema);
module.exports = physicSchema
