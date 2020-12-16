const express = require("express");
const router = express.Router();
const authenticate = require("../../middleware/authenticate");
const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

router.get("/:post_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }

    return res.status(500).json({ msg: "Server error." });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, description, link } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");
    post = new Post({
      user: req.user.id,
      name: user.name,
      title,
      description,
      link,
    });

    const savedPost = await post.save();

    return res.status(200).json({ savedPost });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

router.put("/:post_id", authenticate, async (req, res) => {
  let post = await Post.findById(req.params.post_id);
  const { title, description, link } = req.body;

  console.log(post);
  try {
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized." });
    }

    post = await Post.findOneAndUpdate(
      { user: req.user.id },
      { $set: { title, description, link } },
      { new: true }
    );

    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

router.delete("/:post_id", authenticate, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  try {
    if (!post) {
      return res.status(404).json({ msg: "Post not found." });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized." });
    }

    await post.remove();

    return res.status(200).json({ msg: "Post removed." });
  } catch (error) {
    console.error(error.message);

    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found." });
    }

    return res.status(500).json({ msg: "Server error." });
  }
});

router.put("/like/:post_id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    // see if the post has already been liked by the user
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length > 0
    ) {
      return res.status(400).json({ msg: "You can only like a post once." });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

router.put("/unlike/:post_id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    // see if the post has already been liked by the user
    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length === 0
    ) {
      return res.status(400).json({
        msg:
          "You can't unlike something that you didn't like. You know what I'm saying?",
      });
    }

    const removeIndex = post.likes
      .map((like) => {
        return like.user.toString();
      })
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.status(200).json(post.likes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
