const router = require("express").Router();
const auth = require("../middleware/auth");
const NoteModel = require("../models/notesModel");


router.get("/list", async( req, res ) => {
    try{
        let notesList = await NoteModel.find();

        notesList = notesList.sort((firstNote, secondNote) => {
            return new Date(secondNote.date.split("-").reverse().join("-")) - new Date(firstNote.date.split("-").reverse().join("-")) 
        });
        
        res.status(200).json(notesList);

    }
    catch(err){
        res.status(500).send();
    }
});

router.get("/detail/:id", async( req, res ) => {

    try{
        const noteId = req.params.id;

        const existingNote = await NoteModel.findById(noteId);

        if(!existingNote)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir not bulunmamaktadır."
            });

        res.status(200).json(existingNote);
    }

    catch(err){
        res.status(500).send();
    }
});

router.get("/group-notes/:parentHeader", async( req, res ) => {
    try{
        const parentHeader = req.params.parentHeader;
        var criteria = { $or: [{ parentHeader }] };

        let existingNotes = await NoteModel.find(criteria);

        existingNotes = existingNotes.sort((firstNote, secondNote) => {
            return new Date(secondNote.date.split("-").reverse().join("-")) - new Date(firstNote.date.split("-").reverse().join("-")) 
        });

        res.status(200).json(existingNotes);
    }

    catch(err){
        res.status(500).send();
    }
});

router.get("/detail-by-url/:url", async(req, res) => {

    try{
        const url = req.params.url;
        const existingNote = await NoteModel.findOne({url})
        if(!existingNote)
            res.status(404).json({
                responseErrorMessage:"Böyle bir not bulunamadı."
            });
       
       res.status(200).json(existingNote)
              
    }

    catch(err){
        res.status(500).send();
    }

})

router.post("/add", auth, async( req, res ) => {
    try{
        const { headerName, content, url, date, parentHeader, shortExplaining } = req.body;
        var criteria = { $or: [{ headerName }, {url}] };
        
        if(!headerName || !content || !url || !date || !parentHeader || !shortExplaining)
            return res.status(404).json({
                responseErrorMessage:"Lütfen bilgileri eksiksiz giriniz."
            });
        
        const existingNote = await NoteModel.findOne(criteria);

        if(existingNote)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir başlığa ait not bulunmaktadır."
            });

        const newNote = new NoteModel({
            headerName,
            content,
            url,
            date,
            parentHeader,
            shortExplaining
        });

        await newNote.save()
        .then(() => {
            res.status(200).json({
                responseSuccessMessage: "Yeni not başarıyla kaydedilmiştir."
            })   
        })
        .catch(() => {
            res.status(404).json({
                responseErrorMessage:"Bir sorun ile karşılaşıldı. Lütfen tekrar deneyiniz."
            })
        });
    }
    catch(err){
        res.status(500).send();
      
    }
});

router.delete("/delete/:id", auth, async( req, res ) => {

    try{
        const noteId = req.params.id;

        const existingNote = await NoteModel.findById(noteId);

        if(!existingNote)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir not bulunmamaktadır."
            })

        await existingNote.delete()
        .then(() => {
            res.status(200).json({
                responseSuccessMessage:"Not başarıyla silindi."
            })
        })
        .catch(()=> {
            res.status(404).json({
                responseErrorMessage:"Not silinirken bir sorun ile karşılaşmılmıştır. Lütfen tekrar deneyiniz."
            })
        });
    }

    catch(err){
        res.status(500).send();
    }
});

router.put("/update/:id", auth, async( req, res ) => {

    try{
        const noteId = req.params.id;
        const { headerName, content, url, date, parentHeader, shortExplaining } = req.body;
        
        const existingNote = await NoteModel.findById(noteId);
        var criteria = { $or: [{ headerName }, {url}] };
        const alreadyExistingNote = await NoteModel.findOne(criteria);

        if(!existingNote)
            return res.status(404).json({
                responseErrorMessage:"Böyle bir not bulunmamktadır."
            });

        if(!headerName || !content || !url || !date || !parentHeader || !shortExplaining )
            return res.status(404).json({
                responseErrorMessage:"Lütfen bilgileri eksiksiz giriniz."
            });
        
        if(alreadyExistingNote && alreadyExistingNote.headerName !== existingNote.headerName && alreadyExistingNote.url !== existingNote.url)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir başlığa ait not bulunmaktadır. Lütfen başlık ismini değiştirip tekrar denyiniz."
            })

        existingNote.headerName = headerName;
        existingNote.content = content;
        existingNote.date = date;
        existingNote.url = url;
        existingNote.parentHeader = parentHeader;
        existingNote.shortExplaining = shortExplaining;

        await existingNote.save()
        .then(() => {
            res.status(200).json({
                responseSuccessMessage:"Not başarıyla güncellendi."
            })
        })
        .catch(()=> {
            res.status(404).json({
                responseErrorMessage:"Not güncellenirken bir sorun ile karşılaşmılmıştır. Lütfen tekrar deneyiniz."
            })
        });
        
    }

    catch(err){
        res.status(500).send();
    }

})

module.exports = router;