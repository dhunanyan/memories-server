import mongoose from "mongoose";
import PostMessage from "../modeles/postMessage.js";

//GET POST
//http://localhost:5000/posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

//POST POST
//http://localhost:5000/posts
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: error.message });
  }
};

//UPDATE POST
//http://localhost:5000/posts/:id
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no Post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

//DELETE POST
//http://localhost:5000/posts/:id
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no Post width that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully!" });
};

//LIKE POST
//http://localhost:5000/posts/:id/likePost
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no Post width that id");

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );

  res.json(updatedPost);
};
