const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started"));

app.use("/notes", require("./Routers/notesRouter"));
app.use("/user", require("./Routers/userRouter"));
app.use("/english-test", require("./Routers/englishQuestionsRouter"));
app.use("/authentication", require("./Routers/authenticationRouter"));

mongoose.connect(process.env.MDB_CONNECT_STRING, { useNewUrlParser:true },
    err => {
        if(err) throw err;
        console.log("başarılı bağlantı")
    })