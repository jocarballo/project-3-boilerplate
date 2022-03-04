const Plant = require('../models/Plant')
const express = require('express');
const router = express.Router();


// get all the plants
router.get('/plants', (req, res, next) => {
    Plant.find()
      .then(plants => {
        res.status(200).json(plants)
      })
  });


// get a specific plant
router.get('/plants/:id', (req, res, next) => {
  Plant.findById(req.params.id)
    .then(plant => {
      // check for a valid mongo object id
      if(!plant) {
        res.status(404).json(plant)
      } else {
        res.status(200).json(plant)
      }
    })
});


// update a plant
router.put('/plants/:id', (req, res, next) => {
  const { common_name, scientific_name, description } = req.body
  Plant.findByIdAndUpdate(req.params.id, {
      common_name,
      scientific_name, 
      description
  }, { new: true })
    .then(updatedPlant => {
      res.status(200).json(updatedPlant)
    })
    .catch(err => next(err))
});




module.exports = router;
