import { PostModel } from "../models/Posts.js";
import express from "express";
import { UserModel } from "../models/Users.js";
import axios from "axios";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await PostModel.find({});
    res.json(response);
  } catch (err) {
    // console.error(err);
    res.status(500).json({ msg: err });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const poster = await UserModel.findById(req.body.authorID);
  if (!poster) {
    return res.status(500).json({ msg: "Author Doesn't Exist" });
  }

  try {
    const response = await axios.head(req.body.image);
    const contentType = response.headers["content-type"];
    if (!contentType.startsWith("image/")) {
      return res.status(400).json({ error: "Bad Image" });
    }
  } catch (err) {
    return res.status(400).json({ error: "Bad Image" });
  }

  const newPost = req.body;
  newPost.author = poster.username;
  // console.log(newPost);
  // return res.json(poster);
  const post = new PostModel(req.body);
  try {
    const response = await post.save();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.body.postID);
    const user = await UserModel.findById(req.body.userID);
    user.saved.push(post);
    await user.save();
    res.json({ saved: user.saved });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/saved/:userID/:deleteID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const index = user.saved.indexOf(req.params.deleteID);
    if (index === -1) {
      return res.status(500).json({ error: "Post not found in saved" });
    }

    user.saved.splice(index, 1);
    await user.save();
    res.json({ saved: user.saved });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/saved/ids/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ saved: user?.saved });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/saved/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const saved = await PostModel.find({
      _id: { $in: user.saved },
    });
    res.json({ saved });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/liked/ids/:postID", verifyToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postID);
    if (!post) {
      return res.status(404).json({ msg: "no post found with that id" });
    }

    res.json({ liked: post.liked });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/liked", verifyToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.body.postID);
    const user = await UserModel.findById(req.body.userID);

    if (!post || !user) {
      return res
        .status(404)
        .json({ msg: "no post or user found with that id" });
    }

    post.liked.push(user);
    await post.save();
    res.json({ liked: post.liked });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/liked/:userID/:postID", verifyToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postID);
    const index = post.liked.indexOf(req.params.userID);
    if (index === -1) {
      return res.status(500).json({ error: "User not found in liked" });
    }

    post.liked.splice(index, 1);
    await post.save();
    res.json({ liked: post.liked });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export { router as postRouter };
