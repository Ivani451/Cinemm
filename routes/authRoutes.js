const passport = require("passport");

module.exports = app => {
  /*
  When we visit the /auth/google route, we will forward the user to the
  oauth flow using Passport's Google strategy.
  The scope argument specifies what information we want from Google.
  The prompt argument "prompts" the user to select the Google account
  they want to use with the Google oauth, rather than automatically choosing
  one they have used before.
*/
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account"
    })
  );

  /* 
    Once we have selected the account to authenticate, we put the user
    on hold and take the code from the URL. Afterwards, the code below
    sends a request to Google with the code we received and we retrieve
    the users information.
  */
  app.get("/auth/google/callback", passport.authenticate("google"));

  // When we visit this route, the logout method takes the cookie that
  // contains the ID and gets rid of it
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // After our authentication flow, we provide the user's info
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
