const BlogPost = require("../models/BlogPost");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controller/BlogPostController");

jest.mock("../models/BlogPost"); // Mocking the BlogPost model

describe("BlogPostController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    test("should create a new post", async () => {
      const mockPost = {
        title: "Test Title",
        content: "Test Content",
        author: "Test Author",
      };
      BlogPost.mockReturnValueOnce({
        save: jest.fn().mockResolvedValue(mockPost),
      });

      req.body = mockPost;
      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    test("should handle error during post creation", async () => {
      const errorMessage = "Internal Server Error";
      BlogPost.mockReturnValueOnce({
        save: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("getAllPosts", () => {
    test("should retrieve posts with sorting by title", async () => {
      const mockPosts = [
        { title: "Title C", content: "Content C", author: "Author A" },
        { title: "Title A", content: "Content A", author: "Author B" },
        { title: "Title B", content: "Content B", author: "Author C" },
      ];

      BlogPost.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPosts), // Mocking the sort function here
      });

      req.query = { sortBy: "title" };

      await getAllPosts(req, res);

      expect(BlogPost.find).toHaveBeenCalledWith({});
      expect(BlogPost.find().sort).toHaveBeenCalledWith({ title: 1 });
      expect(BlogPost.countDocuments).toHaveBeenCalledWith({});
    });
  });

  describe("getPostById", () => {
    test("should get a post by ID", async () => {
      const postId = "mocked-post-id";
      const mockPost = { _id: postId, title: "Test Post" };
      BlogPost.findById = jest.fn().mockResolvedValue(mockPost);

      req.params.id = postId;
      await getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    test("should handle error when getting a post by ID", async () => {
      const postId = "invalid-id";
      const errorMessage = "Post not found";
      BlogPost.findById = jest.fn().mockResolvedValue(null);

      req.params.id = postId;
      await getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("updatePost", () => {
    test("should update a post", async () => {
      const postId = "mocked-post-id";
      const updatedPost = { _id: postId, title: "Updated Post" };
      BlogPost.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedPost);

      req.params.id = postId;
      req.body = updatedPost;
      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedPost);
    });

    test("should handle error when updating a post", async () => {
      const postId = "invalid-id";
      const errorMessage = "Post not found";
      BlogPost.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      req.params.id = postId;
      await updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("deletePost", () => {
    test("should delete a post", async () => {
      const postId = "mocked-post-id";
      const deletedPost = { _id: postId };
      BlogPost.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPost);

      req.params.id = postId;
      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post deleted successfully",
      });
    });

    test("should handle error when deleting a post", async () => {
      const postId = "invalid-id";
      const errorMessage = "Post not found";
      BlogPost.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      req.params.id = postId;
      await deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
