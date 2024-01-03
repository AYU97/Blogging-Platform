const BlogPost = require("../models/BlogPost");

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({ title, content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const { page, limit, sortBy, searchQuery } = req.query;
    let posts;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      posts = await BlogPost.find({
        $or: [{ title: regex }, { content: regex }],
      });

      const total = posts.length;
      res
        .status(200)
        .json({ total, count: total, pagination: undefined, posts });
      return;
    }

    let query = {};

    let sortCriteria = {};
    if (sortBy === "title" || sortBy === "createdAt") {
      sortCriteria[sortBy] = sortBy === "title" ? 1 : -1;
    } else {
      // Default sorting by createdAt in descending order
      sortCriteria = { createdAt: -1 };
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;

    const total = await BlogPost.countDocuments(query);
    const pageCount = Math.ceil(total / limitNumber);

    let pagination = {};
    if (pageNumber < pageCount) {
      pagination.next = {
        page: pageNumber + 1,
        limit: limitNumber,
      };
    }

    if (pageNumber > 1) {
      pagination.prev = {
        page: pageNumber - 1,
        limit: limitNumber,
      };
    }

    posts = await BlogPost.find(query)
      .sort(sortCriteria)
      .limit(limitNumber)
      .skip(startIndex);
    res.status(200).json({ total, count: posts.length, pagination, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content, author } = req.body;
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await BlogPost.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
