const Question = require('../models/Question')
const express = require('express');
const router = express.Router();


router.post('/questions', (req, res, next) => {
    // TODO: Need to extract the user id from the authorization token
    // TODO: We need to associate the created question with the user.
    console.log("POST for question!")
    const { title, message } = req.body
    Question.create({ title, message })
        .then(question => {
            res.status(200).json(question)
        })
        .catch(err => next(err))
});


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



module.exports = router;
