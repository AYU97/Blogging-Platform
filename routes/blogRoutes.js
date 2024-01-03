/**
 * @swagger
 * tags:
 *   name: Blog Posts
 *   description: API endpoints for managing blog posts
 */

/**
 * @swagger
 * /blogPost:
 *   post:
 *     summary: Create a new blog post
 *     description: Endpoint to create a new blog post
 *     tags: [Blog Posts]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Blog post object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *             author:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: "#/definitions/BlogPost"
 */

/**
 * @swagger
 * /blogPost:
 *   get:
 *     summary: Get all blog posts or search for posts
 *     description: Endpoint to get all blog posts or search for posts
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number for paginated results
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         type: integer
 *       - in: query
 *         name: sortBy
 *         description: Sort field ('title' or 'createdAt')
 *         type: string
 *       - in: query
 *         name: searchQuery
 *         description: Search term for posts
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             count:
 *               type: integer
 *             pagination:
 *               type: object
 *             posts:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/BlogPost"
 */

/**
 * @swagger
 * /blogPost/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     description: Endpoint to get a blog post by its ID
 *     tags: [Blog Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Blog post ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BlogPost"
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /blogPost/{id}:
 *   put:
 *     summary: Update a blog post
 *     description: Endpoint to update a blog post by its ID
 *     tags: [Blog Posts]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Blog post ID
 *         required: true
 *         type: string
 *       - in: body
 *         name: body
 *         description: Updated blog post object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             content:
 *               type: string
 *             author:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/BlogPost"
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /blogPost/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     description: Endpoint to delete a blog post by its ID
 *     tags: [Blog Posts]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Blog post ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Post not found
 */

// Definition for BlogPost object
/**
 * @swagger
 * definitions:
 *   BlogPost:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       author:
 *         type: string
 */

const express = require("express");
const router = express.Router();
const blogPostController = require("../controller/BlogPostController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, blogPostController.createPost);
router.get("/", blogPostController.getAllPosts);
router.get("/:id", blogPostController.getPostById);
router.put("/:id", authMiddleware, blogPostController.updatePost);
router.delete("/:id", authMiddleware, blogPostController.deletePost);

module.exports = router;
