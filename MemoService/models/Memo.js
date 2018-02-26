const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemoSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   details: {
       type: String,
       required: true
   },
    date: {
       type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Memo', MemoSchema);