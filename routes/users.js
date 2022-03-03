const User = require('../models/User')
const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant')
const jwt = require('jsonwebtoken')


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


// get the plants from the user
router.get('/users/:id/plants', (req, res, next) => {
  const userToken = req.headers.authorization;
  const token = userToken.split(' ');
  const user = jwt.verify(token[1], process.env.JWT_SECRET);
  console.log("user: ", user);
    User.findById(user._id)
      // with populate I get the entire object instead only the id from the plant
      .populate('plants') 
      .then(user => {
        res.status(200).json(user.plants)
      })
      .catch(err => next(err))
  })


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