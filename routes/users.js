const User = require('../models/User')
const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant')



// get all the users
router.get('/users', (req, res, next) => {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
  });


  router.post('/users', (req, res, next) => {
    // get the values from request body
    const { username, email, password } = req.body
    User.create({ username, email, password })
        .then(user => res.redirect('/users'))
        .catch(err => {
            res.render('/users')
        })
});


// get a specific user
router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        // check for a valid mongo object id
        if(!user) {
          res.status(404).json(user)
        } else {
          res.status(200).json(user)
        }
      })
  });


// update a user
router.put('/users/:id', (req, res, next) => {
    const { username, email, password } = req.body
    User.findByIdAndUpdate(req.params.id, {
        username, 
        email, 
        password
    }, { new: true })
      .then(updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch(err => next(err))
  });


router.get('/users/:id/plants', (req, res, next) => {
    
});


// associate a plant to a user
router.post('/users/:id/plants/:plantId', (req, res, next) => {
    const plantId = req.params.plantId
    console.log('associating user and plant')
    Plant.findById(plantId)
        .then(plant => {
            console.log("[Plant]", plant);
            const userId = req.params.id
            return User.findByIdAndUpdate(
                userId, 
                { $push: { plants: plant } },
                { new: true })
        })
        .then(user => {
            console.log("[User]", user)
            res.status(201).json(user)
        }) 
        .catch(err => next(err))
});


// delete a plant from user
router.delete('/users/:id/plants/:plantId', (req, res, next) => {
    const plantId = req.params.plantId
    Plant.findById(plantId)
        .then(plant => {
            const userId = req.params.id
            return User.findByIdAndUpdate(
                userId,
                { $pull: { plants: plant._id } },
                { new: true })
            })
            .then(() => {
                res.status(200).json({ message: 'plant deleted' })
              })
              .catch(err => next(err))
});



module.exports = router;