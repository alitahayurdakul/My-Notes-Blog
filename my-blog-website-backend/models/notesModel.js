const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    headerName:{type:String, required:true},
    content:{type:String, required:true},
    url:{type:String, required:true},
    date:{type:String, required:true},
    parentHeader:{type:String, required:true},
    shortExplaining:{type:String, required:true}
});


const Notes = mongoose.model('note', NotesSchema);

module.exports = Notes;