const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
  title: String,
  review: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date
});

mongoose.model("submissions", submissionSchema);
