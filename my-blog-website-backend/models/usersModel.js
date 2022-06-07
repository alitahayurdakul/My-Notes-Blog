const mongoose  = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String, required:true},
    surname:{type:String, required:true},
    email:{type:String, required:true},
    passwordHash: {type:String, required:true},
    userName: {type:String, required:true}
});

const Users = mongoose.model('user',UserSchema);

module.exports = Users;