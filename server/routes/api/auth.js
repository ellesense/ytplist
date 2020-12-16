const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JwtSecret = require("config").get("JwtSecret");
const authenticate = require("../../middleware/authenticate");

// register
router.post(
  "/register",
  [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "A valid email is required.").isEmail(),
    check(
      "password",
      "Please enter a password with 6 of more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if user exists in db
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      }

      user = new User({ name, email, password });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jwt
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        JwtSecret,
        { expiresIn: 100000000 },
        function (err, token) {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// sign in
router.post(
  "/signin",
  [
    check("email", "A valid email is required.").isEmail(),
    check("password", "Password is required.").exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if the email exists in db
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Email and/or password is incorrect." }],
        });
      }

      // verify password
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email and/or password is incorrect." }] });
      }

      // return jwt
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        JwtSecret,
        { expiresIn: 100000000 },
        function (err, token) {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// fetch the user info from db
router.get("/", authenticate, async (req, res) => {
  try {
    const signedInUser = await User.findById(req.user.id).select("-password");

    return res.status(200).json(signedInUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
