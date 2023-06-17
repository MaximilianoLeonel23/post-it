import PostIt from "../models/postit.models.js";

export const getPostIts = async (req, res) => {
  const postIts = await PostIt.find({
    user: req.user.id,
  }).populate("user");

  return res.json(postIts);
};

export const getPostIt = async (req, res) => {
  try {
    const postItFound = await PostIt.findById(req.params.id).populate("user");

    if (!postItFound) {
      return res.status(404).json({ message: "Post It no encontrado" });
    }

    return res.json(postItFound);
  } catch (error) {
    return res.status(404).json({ message: "Post It no encontrado" });
  }
};

export const createPostIt = async (req, res) => {
  const { title, content, tags, favourite, color } = req.body;

  const newPostIt = new PostIt({
    title,
    content,
    tags,
    favourite,
    color,
    user: req.user.id,
  });

  const savedPostIt = await newPostIt.save();
  return res.json(savedPostIt);
};

export const deletePostIt = async (req, res) => {
  try {
    const postItFound = await PostIt.findByIdAndDelete(req.params.id);

    if (!postItFound) {
      return res.status(404).json({ message: "Post It no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Post It no encontrado" });
  }
};
export const updatePostIt = async (req, res) => {
  try {
    const postItFound = await PostIt.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!postItFound) {
      return res.status(404).json({ message: "Post It no encontrado" });
    }

    return res.json(postItFound);
  } catch (error) {
    return res.status(404).json({ message: "Post It no encontrado" });
  }
};
