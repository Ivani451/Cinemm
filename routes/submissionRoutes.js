const mongoose = require("mongoose");

/*
  Rather than pass in the "submissions" model the traditional way, we require mongoose
  and then assign the model to the "Submission" constant to bypass issues
  with running tests with mongoose
*/
const Submission = mongoose.model("submissions");

module.exports = app => {
  app.get("/api/submissions", async (req, res) => {
    const submissions = await Submission.find({ _user: req.user.id });

    res.send(submissions);
  });

  app.post("/api/submissions", async (req, res) => {
    const title = req.body.title;
    const review = req.body.review;
    console.log(title);
    const submission = new Submission({
      title,
      review,
      _user: req.user.id,
      dateSent: Date.now()
    });
    submission.save();
  });
};
