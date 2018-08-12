const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
/* 
  The order for the two require statements below is important.
  If they were switched, we would get an error because passport
  would be trying to pull the model class (Schema) out of mongoose
  before we actually even define it in "User" file.
*/
require("./models/User");
require("./services/passport");

// Connecting mongoose to our remote mongo database
mongoose.connect(keys.mongoURI);

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
