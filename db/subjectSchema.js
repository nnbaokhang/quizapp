var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subjectSchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String},
    rating: {type: Number, min:0,max:5},
});

var subject = mongoose.model('subject', subjectSchema);
module.exports = subject
