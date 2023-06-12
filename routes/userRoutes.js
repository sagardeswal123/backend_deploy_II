const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()




const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body
    console.log(req.body)
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.json({ msg: err.message })
            } else {
                const user = new UserModel({ name, email, pass: hash });
                await user.save();
                res.json({ msg: "user has been resgister", user: req.body })
            }

        })

    }
    catch (error) {
        res.json({ msg: error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass, name } = req.body;
    // console.log(req.body)
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userId: user._id, user: user.name }, process.env.key);
                    res.json({ msg: "person Logged in", token })
                }
                else {
                    res.json({ msg: "wrong crendential" })
                }
            })
        }
        else {
            res.json({ msg: "user does not exist" })
        }


    }
    catch (error) {
        res.json({ msg: error.message })
    }
})


module.exports = { userRouter }