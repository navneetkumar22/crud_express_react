const User = require("../models/userModels");

//home route
exports.home = (req, res) => {
    res.send("<h1>Hello World! This is first demo CRUD app built using React + Express</h1>")
};

//create a User
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        //validate the entries
        if (!name || !email) {
            throw new Error("Name and Email are required")
        }

        //if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User is already existed");
        }

        //inserting into database
        const user = await User.create({ name, email });
        res.status(200).json({
            success: true,
            message: "User created Successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
};

//getting all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.log(error);
    }
};

//edit a user
exports.editUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
};

//delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
    }
};