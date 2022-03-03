const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middleware/jwt");



router.post('/signup', (req, res, next) => {
    const { username, email, password } = req.body
    console.log("body", req.body)
    // check if username or email or password are empty
    console.log("username", username)
    console.log("email", email)
    console.log("password", password)
    if(username === "" || email === "" || password === "") {
        res.status(400).json({ message: "Please, provide username, password and name" })
        return
    }

    // validade the email address
    const emailValid = email.includes("@")
    if(!emailValid) {
        res.status(400).json({ message: "Please, provide a valid email address" })
        return
    }

    // validate the password
    if(password.length < 4) {
        res.status(400).json({ message: "Password should have 4 chars at least" })
        return
    }

    // check the DB if a user with the same email exists
    User.findOne({ email })
        .then(foundUser => {
            //if the user already exists send an error
            if(foundUser) {
                res.status(400).json({ message: "This User already exists" })
                return
            }

            // hash the password
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt)
            // create the new user
            return User.create({ username, email, password: hashedPassword })
                .then(createdUser => {
                    const { username, email, password, plants, _id } = createdUser
                    const user = { username, email, password, plants, _id }
                    res.status(201).json({ user: user })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: "Internal Server Error" })
                })
        })
});



router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    if(username === "" || password === "") {
        res.status(400).json({ message: "Please, provide username and password" })
        return
    }
    User.findOne({ username })
        .then(foundUser => {
            if(!foundUser) {
                res.status(400).json({ message: "User not found" })
                return
            }
            const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
            if(passwordCorrect) {
                const { username, email, plants, _id } = foundUser
                const payload = { username, email, plants, _id }
                // create the json web token
                const authToken = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { algorithm: 'HS256', expiresIn: '12h' }
                )
                res.status(200).json({ authToken })
            } else {
                res.status(401).json({ message: "Unable to authenticate" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
});


router.get('/verify', isAuthenticated, (req, res, next) => {
    // if the token is valid we can access it on: req.payload
    console.log("request payload is: ", req.payload)
    res.status(200).json(req.payload)
});


module.exports = router;



