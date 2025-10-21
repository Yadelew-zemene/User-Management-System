const express = require("express");
const bodyParser = require("body-parser");

const myServer = express();
myServer.use(express.static("public"));
const port = 4000;
myServer.set("view engine", 'ejs');
myServer.use(bodyParser.json())
myServer.use(bodyParser.urlencoded({ extended: true }));
let users = [
    { userId: "1", userName: "Yadelew", userEmail: "yadelwzemene@gmail.com", age: 20 },

    { userId: "2", userName: "John", userEmail: "Johnjenny@gmail.com", age: 23 },
    { userId: "3", userName: "Girma", userEmail: "girma@gmail.com", age: 24 },
    
];
// home Router
myServer.get("/", (req, res) => {
    res.render('index', { data: users });
    
})
myServer.post("/", (req, res) => {
    const newUser = {
        userId: req.body.userId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        age:
            req.body.age
    };
    users.push(newUser);
    res.render("index", { data: users });
})
myServer.post("/delete", (req, res) => {
    const requestedId = req.body.userId;
    users.filter(user => req.body.userId != requestedId);
    res.render("index", { data: users });
})
myServer.post("/update", (req, res) => {
    users.forEacha(user => {
        if (user.userId === req.body.userId) {
            user.userName = req.body.userName;
            user.userEmail = req.body.userEmail;
            user.age = req.body.age;

        }
        res.render("index", { data: users });
    })
})
myServer.listen(port, (err) => {
    if (err) {
        console.log("err occured");

    }
    else {
        console.log("Request served");
    }
})