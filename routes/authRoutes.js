/**
 * @swagger
 * /blogPost/auth/login:
 *   post:
 *     summary: User login
 *     description: Endpoint for user authentication and login
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 */

/**
 * @swagger
 * /blogPost/auth/register:
 *   post:
 *     summary: User registration
 *     description: Endpoint for user registration
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 */

// Definition for User object
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 */

const express = require("express");
const router = express.Router();
const authController = require("../controller/AuthController");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
