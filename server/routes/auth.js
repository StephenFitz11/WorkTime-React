const express = require("express");
const router = express.Router();

// Used to test server in browser
router.get("/", (req, res) => {
  res.send("Test");
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid Email or Password.");
  }

  user.loginCount++;
  await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(token);
});

module.exports = router;
