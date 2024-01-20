const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const authorModel = mongoose.model('author',authorSchema);
module.exports = authorModel;   