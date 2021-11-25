const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { findUserById } = require("../service/user-service");
const UserRouter = Router({ mergeParams: true });
const UserService = require("../service/user-service");
const { JWT_SECRET } = require("../config");


UserRouter
//dangnhap
//.route("/authentication")
    .post("/authentication", (req, res) => {
        const { username, password } = req.body;
        console.log(req.body);
        UserService.findUserByUsername(username)
            .then((user) => {
                console.log(user);
                console.log(req.body);
                if (!user) {
                    console.log("user dosen't exist !");
                    return res.status(400).send("user dosen't exist !");
                }

                if (password !== user.password) {
                    console.log("wrong password");
                    return res.status(400).send("wrong password");
                }

                return Promise.resolve(user);
            })
            .then((user) => {
                //console.log(user);
                console.log(user.toObject());
                //ma hoa tai khoan ban ham sign cua jwt
                //nhan vao object tai khoan vs key ma hoa
                const xtoken = jwt.sign(user.toObject(), JWT_SECRET);
                console.log(xtoken);
                return res.send(xtoken);
            })
    })
    //xac thuc token
    .get("/authentication", (req, res) => {
        const token = req.headers["x-token"];
        console.log(token);
        try {
            //giai ma token ve object
            //truyen vao token va key
            const user = jwt.verify(token, JWT_SECRET);
            //console.log(user);
            return res.json(user);
        } catch {
            return res.status(400).send("Invalid Token");
        }
    })
    .get("/:id", (req, res) => {
        console.log(req.params.id);
        return User.findById(req.params.id);
    })
    .get("/", (req, res) => {
        UserService.getAllUsers()
            .then((users) => {
                res.json(users);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send("ERROR");
            });
    })
    .post("/", (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(500).send("username vs password is require !")
        }

        UserService.findUserByUsername(req.body.username)
            .then((use) => {
                if (use) {
                    return res.status(400).send("Username already exists !");
                }
                return Promise.resolve(true);
            })
            .then(() => {
                return UserService.createUser(req.body.username, req.body.password)
                    .then((newUser) => {
                        return res.json(newUser);
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).send("error create");
            });

    })
    .patch("/", (req, res) => {})
    .delete("/:id", (req, res) => {});

//la sao de anh khoong chinh sua code cua em dc 
//lau lau anh cu nhan enter a' :'(
//khong co anh oi
module.exports = UserRouter;