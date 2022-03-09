const Question = require('../models/Question')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')



router.post('/questions', (req, res, next) => {
    // extract the user id from the authorization token
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const user = jwt.verify(token[1], process.env.JWT_SECRET);
    
    // associate the created question with the user.
    const { plant, title, message } = req.body
    
    Question.create({ plant_name: plant, title, message })
        .then(question => {
            return User.findByIdAndUpdate(
                user._id,
                { $push: { questions: question }},
                { new: true }) 
                .then(res.status(200).json(question))
        })
        .catch(err => next(err))
});


// update the question with an answer
router.put('/questions', (req, res, next) => {
    const { questionId, answer } = req.body
    console.log("questionId", questionId)
    console.log("answer", answer)

    Question.findByIdAndUpdate(questionId, { answer }, { new: true })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => next(err))
});



// get the questions from user
router.get('/users/questions', (req, res, next) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(' ');
    const user = jwt.verify(token[1], process.env.JWT_SECRET);
    
      User.findById(user._id)
        // with populate I get the entire object instead only the id from the question
        .populate('questions') 
        .then(user => {
          res.status(200).json(user.questions)
        })
        .catch(err => next(err))
    });


module.exports = router;
