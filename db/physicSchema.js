var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var physicSchema = new Schema({
         mul:{type:Boolean,required: true},
        question: {type:String,unique: true},
        a1: String,
        a2: String,
        a3: String,
        a4: String,
        sa: String
});

var physicSchema = mongoose.model('physic', physicSchema);
module.exports = physicSchema
