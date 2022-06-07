const router = require("express").Router();
const auth = require("../middleware/auth");
const EnglishQuestionModel = require("../models/englishQuestionModel");

router.get("/list", async(req,res) => {

    try{
        const sort = { word: 1 };
        const wordList = await EnglishQuestionModel.find().sort(sort);
        res.status(200).json(wordList);
    }

    catch(err){
        res.status(500).send();
    }

});

router.get("/detail/:questionId", async(req,res) => {
    try{
        const questionId = req.params.questionId;
        const existingWord = await EnglishQuestionModel.findById(questionId);
        if(!existingWord)
            return res.status(404).json({
                responseSuccessMessage:"Böyle bir soru bulunmamaktadır"
            });

        res.status(200).json(existingWord);
    }
    catch(err){
        res.status(500).send();
    }
});

router.post("/add", auth, async(req,res) => {

    try{
        const {word, exampleCentence, optionA, optionB, optionC, correctAnswer} = req.body;
        const isExistingQuestion = await EnglishQuestionModel.findOne({word});

        if(!word || !exampleCentence || !optionA || !optionB || !optionC || !correctAnswer)
            return res.status(404).json({
                responseErrorMessage: "Lütfen bilgileri eksiksiz giriniz"
            });

        if(isExistingQuestion)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir sorun zaten bulunmaktadır. Lütfen başka bir kelimeye ait soru ekleyiniz"
            });

        const newQuestion = new EnglishQuestionModel({
            word,
            exampleCentence,
            optionA,
            optionB,
            optionC,
            correctAnswer
        });

        await newQuestion.save()
        .then(()=>{
            res.status(200).json({
                responseSuccessMessage:"Yeni soru başarıyla eklenmiştir."
            })
        })
        .catch(()=>{
            res.status(404).json({
                responseErrorMessage:"Yeni soru eklenirken bir sorun ile karşılaşıldı. Lütfen tekrar deneyiniz"
            })
        });  
    }

    catch(err){
        res.status(500).send();
    }

})

router.put("/update/:questionId", auth, async(req,res) => {
    try{
        const questionId = req.params.questionId;
        const { word, exampleCentence, optionA, optionB, optionC, correctAnswer } = req.body;
        const existingQuestion = await EnglishQuestionModel.findById(questionId);
        const isExistingQuestion = await EnglishQuestionModel.findOne({word});

        if(!word || !exampleCentence || !optionA || !optionB || !optionC || !correctAnswer)
            return res.status(404).json({
                responseErrorMessage: "Lütfen bilgileri eksiksiz giriniz"
            });

        if(isExistingQuestion && isExistingQuestion.word !== existingQuestion.word)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir soru zaten bulunmaktadır"
            });

        if(!existingQuestion)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir soru bulunmamaktadır"
            });

        existingQuestion.word = word;
        existingQuestion.exampleCentence = exampleCentence;
        existingQuestion.optionA = optionA;
        existingQuestion.optionB = optionB;
        existingQuestion.optionC = optionC;
        existingQuestion.correctAnswer = correctAnswer;

        await existingQuestion.save()
        .then(() => {
            res.status(200).json({
                responseSuccessMessage:"Soru güncelleme işlemi başarılı"
            })
        })
        .catch(() => {
            res.status(404).json({
                responseErrorMessage:"Soru güncellenirken hata ile karşılaşıldı. Lütfen daha sonra tekrar deneyiniz"
            })
        });    
    }

    catch(err){
        res.status(500).send();
    }
});

router.delete("/delete/:questionId", auth, async(req,res) => {

    try{
        const questionId = req.params.questionId;
        const existingQuestion = await EnglishQuestionModel.findById(questionId);
        if(!existingQuestion)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir soru bulunmamaktadır"
            });

        await existingQuestion.delete()
        .then(() => {
            res.status(200).json({
                responseSuccessMessage:"Soru silme işlemi başarılı"
            })
        })
        .catch(() => {
            res.status(404).json({
                responseErrorMessage:"Soru silinirken bir sorun ile kaşılaşıldı. Lütfen daha sonra tekrar deneyiniz"
            })
        })
    }

    catch(err){
        res.status(500).send();
    }
});

module.exports = router;
