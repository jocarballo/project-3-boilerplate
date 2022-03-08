const Note = require("../models/Note");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthorizedError } = require("express-jwt/lib");

router.post("/notes", (req, res, next) => {
  // extract the user id from the authorization token
  const userToken = req.headers.authorization;
  const token = userToken.split(" ");
  const user = jwt.verify(token[1], process.env.JWT_SECRET);

  // associate the created note with the user.
  const { text, watered, soil_changed, plantId } = req.body;

  console.log("req.body: ", req.body)

  Note.create({ text, watered, soil_changed, plant: plantId, user: user._id })
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => next(err));
});

// get the notes from user
router.get("/notes", (req, res, next) => {
  const userToken = req.headers.authorization;
  const token = userToken.split(" ");
  const user = jwt.verify(token[1], process.env.JWT_SECRET);

  Note.find({user: user._id})
    .then((notes) => {
      console.log("User notes", notes)
      res.status(200).json(notes);
    })
    .catch((err) => next(err));
});

// delete a note from user
router.delete("/notes/:noteId", (req, res, next) => {
  // extract the user id from the authorization token
  const userToken = req.headers.authorization;
  const token = userToken.split(" ");
  const user = jwt.verify(token[1], process.env.JWT_SECRET);

  const noteId = req.params.noteId;
  Note.findById(noteId)
    .then((note) => {
      if (note.user.equals(user._id)) {
        note.remove();
        res.status(200).json(note);
      } else {
        throw UnauthorizedError(401);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
