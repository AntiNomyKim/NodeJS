var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
    created:{
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content:{
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.objectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comments', commentSchema);