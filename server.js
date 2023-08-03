// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/usersdb')
    .then(() => {
        console.log("Database connection Successfully")
    }).catch(() => {
        console.log("Connection error")
    })

const User = require("./public/users");
const { response } = require("express");
// const { $where } = require("./public/data");

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/login.html")
});

app.post("/login", async (req, res) => {
    try {
        let useremail = await User.findOne({ email: req.body.email });
        if (useremail === null) {
            res.json({ status: true, message: "You are not Authorized!" })
        } else {
            if (useremail.password === req.body.password) {
                res.json({ satus: true, userData: useremail })
            } else {
                res.json({ status: true, message: "incorrect Password!" })
            }
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/register.html")
});

app.post("/register", async (req, res) => {
    try {
        const info = new User(req.body);
        let userDoc = await info.save();
        res.json({ status: true, data: userDoc })
    } catch (error) {
        res.status(404).send(e.message);
    }
});

app.get("/", function (req, res) {
    User.find({})
        .then((data) => {
            res.render("home", { data })
        }).catch((y) => {
            console.log(y)
        })  
})

app.listen(3000, function () {
    console.log("server is running on port 3000")
});