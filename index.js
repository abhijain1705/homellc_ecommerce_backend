const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/userRoute");
const PasswordRoutes = require("./routes/passwordRoute");
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.use("/homellc/users", UserRoutes);
app.use("/homellc/passwords", PasswordRoutes);


const connectUser =
    process.env.MONGODB_URL;

mongoose
    .connect(connectUser, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        let port = process.env.PORT;
        if (port == null || port == "") {
            port = 8000;
        }
        console.log("successfully listening on port 5000 after connection")
        app.listen(process.env.PORT);
    }).catch((e) => {
        console.log("error", e.message);
    })