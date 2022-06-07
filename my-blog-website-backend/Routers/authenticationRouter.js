const router = require("express").Router();
const UsersModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {

    try {
        const { userName, password } = req.body;

        if (!userName || !password)
            return res.status(400).json({
                responseErrorMessage: "Lütfen bilgileri eksiksiz giriniz."
            });

        const existingUser = await UsersModel.findOne({ userName })

        if (!existingUser)
            return res.status(400).json({
                responseErrorMessage: "Böyle bir kullanıcı bulunmamaktadır."
            });

        const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);

        if (!correctPassword)
            return res.status(401).json({
                responseErrorMessage: "Kullanıcı adınız veya şifreniz yanlış."
            });

        const payload = {
            user: {
                id: existingUser._id,
            },
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 365*7*24*60*1000),
        }).json({
            userId:existingUser._id
        });
    }

    catch (error) {
        res.status(500).send();
    }
});

router.get("/loggedIn", async (req, res) => {

    try {
        console.log(req.cookies)
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json(
                {
                    isLogin: false
                }
            );

        const validateUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!validateUser.user)
            return res.status(401).json(
                {
                    isLogin: false
                }
            );

        res.status(200).json({
            user:validateUser.user,
            isLogin: true
        });
    }

    catch (error) {
        res.status(500).send();
    }

});

router.get("/logOut", async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            expires: new Date(0)
        }).send()
    }
    catch (error) {
        res.status(500).send();
    }
})

module.exports = router;