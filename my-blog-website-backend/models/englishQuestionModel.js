const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const englishQuestionsSchema = new Schema({
    word:{type:String, required:true},
    exampleCentence:{type:String, required:true},
    optionA:{type:String, required:true},
    optionB:{type:String, required:true},
    optionC:{type:String, required:true},
    correctAnswer:{type:String, required:true}
});

const englishQuestions = mongoose.model("englishQuestion",englishQuestionsSchema);

module.exports = englishQuestions;