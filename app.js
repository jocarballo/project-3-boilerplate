// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
//const allRoutes = require("./routes/index.routes");
//app.use("/api", allRoutes);

const plants = require("./routes/plants")
const users = require("./routes/users")
const auth = require("./routes/auth")
const question = require("./routes/question")
const note = require("./routes/note")
const basket = require("./routes/basket")
const events = require("./routes/events")


app.use("/", plants)
app.use("/", users)
app.use("/", auth)
app.use("/", question)
app.use("/", note)
app.use("/", basket)
app.use("/", events)


const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
