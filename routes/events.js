const express = require("express");
const router = express.Router();
const Event = require("../models/Event");


router.get("/events", (req, res, next) => {
  Event.find()
    .then(events => {
      res.status(200).json(events)
    })
    .catch((err) => next(err));
});

module.exports = router;