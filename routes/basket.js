const express = require("express");
const router = express.Router();
const Basket = require("../models/Basket");


// get the plants from the basket
router.get("/basket", (req, res, next) => {
  Basket.findOne()
    .then((basket) => {
      res.status(200).json(basket);
    })
    .catch((err) => next(err));
});


// create a basket (login)
router.post('/basket', (req, res, next) => {
    Basket.create({ plants: []})
    .then((basket) => {
        console.log("Created basket", basket)
        res.status(201).json(basket);
    })
    .catch((err) => next(err));
});



// update the basket
router.put('/basket', (req, res, next) => {
  const { plant } = req.body
  Basket.findOneAndUpdate(
      {}, 
      { $push: { plants: plant } },
      { new: true })
    .then(updatedBasket => {
      res.status(200).json(updatedBasket)
    })
    .catch(err => next(err))
});


// delete the basket (logout)
router.delete("/basket", (req, res, next) => {
  
  Basket.findOne()
    .then((basket) => {
        basket.remove();
        res.status(200).json(basket);
    })
    .catch((err) => next(err));
});


module.exports = router;