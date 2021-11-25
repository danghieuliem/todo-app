const { resolve } = require("path");
const User = require("../models/userModel");
const { use } = require("../routes");

const getAllUsers = () => {
    return User
        .find({})
        .exec();
}

const createUser = (username, password) => {
    return User.create({ username, password });
};

const findUserByUsername = (username) => {
    return User.findOne({ username: username }).exec();
};

const findUserById = (id) => {
    return User.findById(id).exec();
};

const deleteUser = (userId) => {
    return Promise((resolve, reject) => {
        User.findById(userId).then((foundUser) => {

        });
    });
};

module.exports = {
    createUser,
    getAllUsers,
    findUserById,
    findUserByUsername
};