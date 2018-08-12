const mongoose = require("mongoose");
// The code below is the following destructured: const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// We create a new collection (model class) called "users" and base it off our userSchema
mongoose.model("users", userSchema);
