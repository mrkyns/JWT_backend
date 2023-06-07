const Post = require("../schemas/Post");

const getAllPosts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const posts = await Post.find({ user_id });
    if (!posts.length) {
      return res.status(200).json({ msg: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, text } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!text) {
    emptyFields.push("text");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "please fill all fields" });
  }

  try {
    const user_id = req.user._id;
    const post = await Post.create({ title, text, user_id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
