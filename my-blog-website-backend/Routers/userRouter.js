const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../models/usersModel");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");

let validateEmail = email => {
    return email.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
};

var transfer = nodemailer.createTransport({
    host: 'mail.tmstechnic.com',
    port: 587,
    auth: {
        user: 'edirneloko@tmstechnic.com',
        pass: 'XPKL_Otj2_NX'
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.get("/list", auth, async (req, res) => {

    try {
        const userList = await userModel.find();
        res.status(200).send(userList);
    }

    catch (err) {
        res.status(500).send();
    }

});

router.get("/detail/:id", auth, async (req, res) => {
    try {
        const userId = req.params.id;

        const existingUser = await userModel.findById(userId);

        if (!existingUser)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmamaktadır."
            });

        res.status(200).json(existingUser);

    }
    catch (err) {
        res.status(500).send();
    }
});

router.post("/add", auth, async (req, res) => {

    try {
        const { name, surname, email, password, passwordVerify, userName } = req.body;
        const isExistingUser = await userModel.findOne({ userName });

        if (!name || !surname || !email || !password || !passwordVerify || !userName)
            return res.status(404).json({
                responseErrorMessage: "Lütfen bilgileri eksiksiz doldurunuz."
            });

        if (isExistingUser)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmaktadır."
            });

        if (password.length < 6 || password.length > 15)
            return res.status(404).json({
                responseErrorMessage: "Şifreniz en az 6 en, fazla 15 karakterden oluşmalı."
            });

        if (password !== passwordVerify)
            return res.status(404).json({
                responseErrorMessage: "Şifre ve şifre tekrarı uyuşmamaktadır."
            });

        if (!validateEmail(email))
            return res.status(404).json({
                responseErrorMessage: "Lütfen geçerli bir mail adresi giriniz."
            });



        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            surname,
            passwordHash,
            email,
            userName
        });

        await newUser.save()
            .then(() => {
                return res.status(200).json({
                    responseSuccessMessage: "Yeni kullanıcı ekleme işlemi başarılı"
                })
            })
            .catch(() => {
                return res.status(404).json({
                    responseErrorMessage: "Yeni kullanıcı eklenirken bir sorun ile karşılaşıldı. Lütfen tekrar deneyiniz."
                })
            });
    }

    catch (err) {
        res.status(500).send();
    }

});

router.put("/update/:id", auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, surname, email } = req.body;
        const existingUser = await userModel.findById(userId);

        if (!name || !surname || !email)
            return res.status(404).json({
                responseErrorMessage: "Lütfen bilgileri eksiksiz doldurunuz"
            });

        if (!existingUser)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmamaktadır."
            });

        if (!validateEmail(email))
            return res.status(404).json({
                responseErrorMessage: "Lütfen geçerli bir mail adresi giriniz."
            });

        existingUser.name = name;
        existingUser.surname = surname;
        existingUser.email = email;

        await existingUser.save()
            .then(() => {
                res.status(200).json({
                    responseSuccessMessage: "Kullanıcı güncelleme işlemi başarılı"
                })
            })
            .catch(() => {
                res.status(404).json({
                    responseErrorMessage: "Kullanıcı güncelleme işlemi yapılırken bir sorun ile karşılaşıldı. Lütfen tekrar deneyiniz."
                })
            })


    }
    catch (err) {
        res.status(500).send();
    }
});

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const userId = req.params.id;
        const existingUser = await userModel.findById(userId);
        if (!existingUser)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmamaktadır."
            })

        await existingUser.delete()
            .then(() => {
                res.status(200).json({
                    responseSuccessMessage: "Kullanıcı başarıyla silindi."
                });
            })
            .catch(() => {
                res.status(404).json({
                    responseErrorMessage: "Kullanıcı silme işlemi yapılırken hata ile karışılaşıldı. Lütfen tekrar deneyiniz."
                });
            });
    }

    catch (err) {
        res.status(500).send();
    }
});

router.put("/password-change/:id", auth, async (req, res) => {

    try {
        const { password, passwordVerify, oldPassword } = req.body;
        const userId = req.params.id;
        const existingUser = await userModel.findById(userId);

        if (!existingUser)
            return res.status(404).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmamaktadır."
            });

        if (password.length < 6 || password.length > 15)
            return res.status(404).json({
                responseErrorMessage: "Şifreniz en az 6, en fazla 15 karakterden oluşmalı."
            });

        if (password !== passwordVerify)
            return res.status(404).json({
                responseErrorMessage: "Şifre ve şifre tekrarı uyuşmamaktadır."
            });

        const correctOldPassword = await bcrypt.compare(oldPassword, existingUser.passwordHash);

        if (!correctOldPassword)
            return res.status(404).json({
                responseErrorMessage: "Eski şifreniz yanlış"
            });

        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(password, salt);

        existingUser.passwordHash = newPasswordHash;
        await existingUser.save();

        res.status(200).json({
            responseSuccessMessage: "Şifreniz başarıyla değiştirildi."
        });
    }

    catch (err) {
        res.status(500).send();
    }

});

router.put("/password-remember", async (req, res) => {
    try {
        const { userName } = req.body;
        const existingUser = await userModel.findOne({ userName });

        if (!existingUser)
            return res.status(400).json({
                responseErrorMessage: "Lütfen kullanıcı adınızı doğru giriniz"
            });

        var mask = '';
        mask += 'abcdefghijklmnopqrstuvwxyz0123456789';

        var password = '';

        for (var i = 9; i > 0; --i) {
            password += mask[Math.floor(Math.random() * mask.length)];
        }

        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(password, salt);

        existingUser.passwordHash = newPasswordHash;
        var mail = {
            from: "edirneloko@tmstechnic.com",
            to: existingUser.email,
            subject: "Yeni Şifreniz",
            html: `<b>Şifreniz: </b>${password}`,
        }

        await existingUser.save()
            .then(() => {
                transfer.sendMail(mail, function (error) {
                    if (error) console.log(error);
                    else res.json({
                        responseSuccessMessage: "Mail gönderme işlemi başarılı. Lütfen mailinizi kontrol ediniz."
                    });
                });
            })
            .catch((err) => console.log(err));
    }

    catch (err) {
        res.status(500).send();
        console.log(err)
    }
});


module.exports = router;