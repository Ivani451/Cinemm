const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
/* 
  The order for the two require statements below (User and passport) is important.
  If they were switched, we would get an error because passport
  would be trying to pull the model class (Schema) out of mongoose
  before we actually even define it in "User" file.
*/
require("./models/User");
require("./models/Submission");
require("./services/passport");

// Connecting mongoose to our remote mongo database
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

// Have to use body-parser for POST requests
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Our route handlers are used with the express app
require("./routes/authRoutes")(app);
require("./routes/submissionRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // We will serve production code if we're in our production environment
  app.use(express.static("client/build"));

  // If express does not recognize the route, then index.html sill bhe served
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
