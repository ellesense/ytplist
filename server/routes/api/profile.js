const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const authenticate = require("../../middleware/authenticate");
const { check, validationResult } = require("express-validator");

console.log("from profile.js (profile route)", Profile);

// URL: profile/me
router.get("/me", authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

// URL: /profile
router.post("/", authenticate, async (req, res) => {
  const { interests } = req.body;

  const newProfile = {
    user: req.user.id,
    interests: interests.split(",").map((interest) => interest.trim()),
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // update existing profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: newProfile },
        { new: true }
      );

      return res.status(200).json(profile);
    }

    // create a new profile
    profile = new Profile(newProfile);
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

// URL: /profile/all
router.get("/all", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

// URL: /profile/:user_id
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found." });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);

    // handling invalid ObjectId
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found." });
    }

    return res.status(500).json({ msg: "Server error." });
  }
});

router.delete("/", authenticate, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res
      .status(200)
      .json({ msg: "Profile & user info has been removed." });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
