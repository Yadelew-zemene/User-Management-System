const express = require("express");
const bodyParser = require("body-parser");
;

const myServer = express();
myServer.use(express.static("public"));

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
    res.render('index', { data: users,message: null });
    
})
// ADD USER
myServer.post("/", (req, res) => {
    const exists = users.find(u => u.userId === req.body.userId);
    if (exists) {
        return res.render("index", {
            data: users,
            message: "User ID already exists!"
        });
    }
    
    const newUser = {
        userId: req.body.userId || (users.length + 1).toString(),
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        age: Number(req.body.age)
    };
    users.push(newUser);
    res.render("index",
        {
            data: users, message: "User added Successfully!"
            
         });
});
//DELETE USER

myServer.post("/delete", (req, res) => {
    const requestedId = req.body.userId;
   
    const beforeCount = users.length;
   users= users.filter(user => user.userId !== requestedId);
    const message =
        beforeCount === users.length
            ? "User not found!"
            : "User deleted successfully!";
    res.render("index", { data: users ,message});
})

//UPDATE USER
myServer.post("/update", (req, res) => {
     let found = false;
    users.forEacha(user => {
        
        if (user.userId === req.body.userId) {
            found = true;
            user.userName = req.body.userName;
            user.userEmail = req.body.userEmail;
            user.age =Number( req.body.age);

        }
        res.render("index", { data: users ,message: found ? "User updated successfully!" : "User not found!"});
    })
});

// SEARCH USER
myServer.post("/search", (req, res) => {
    const keyword = req.body.keyword.toLowerCase();

    const results = users.filter(user =>
        user.userName.toLowerCase().includes(keyword) ||
        user.userEmail.toLowerCase().includes(keyword)
    );

    res.render("index", {
        data: results,
        message: results.length ? "Showing search results" : "No matching user found"
    });
});
const port = 4000;
myServer.listen(port, (err) => {
    if (err) {
        console.log("err occured")

    }
    else {
        console.log("Request served");
    }
})