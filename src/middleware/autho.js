/**
 * sat thuc token cua nguoi dung
 */
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userService = require("../service/user-service");

const requireUser = (req, res, next) => {
    const token = req.headers["x-token"];

    try {

        //console.log(token);
        //luu lao tai khoan sau khi giai ma token thanh cong
        const encoded = jwt.verify(token, JWT_SECRET);
        userService
            .findUserById(encoded._id)
            .then((user) => {
                /**
                 * neu tim thay thi them opject user vao req
                 */
                req.user = user;
                // console.log(user.username);
                // console.log(user._id);
                next();
            });

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "User is required" });
    }
};

module.exports = { requireUser };