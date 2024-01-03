# Blogging Platform

This project comprises an API for managing blog posts, including authentication for users.

## Description

The Blogging Platform provides endpoints for various operations related to blog posts, such as creating, retrieving, updating, and deleting posts. It also includes authentication endpoints for user login and registration.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AYU97/Blogging-Platform.git
   ```
2. **Install Dependencies**

```bash
cd blogging-platform
npm install
```

3. **Run the Application**

```bash
npm run start
```

4. **To run tests**

```bash
npm run test
```

## Usage

**Endpoints**

- POST /blogPost: Create a new blog post.
- GET /blogPost: Retrieve all blog posts or search for posts.
- GET /blogPost/:id: Retrieve a blog post by ID.
- PUT /blogPost/:id: Update a blog post by ID.
- DELETE /blogPost/:id: Delete a blog post by ID.
- POST /blogPost/auth/login: User login for authentication.
- POST /blogPost/auth/register: User registration.

**Authentication**

```bash
Authentication is required for certain endpoints (POST /blogPost, PUT /blogPost/:id, DELETE /blogPost/:id). Provide a JWT token obtained after login in the Authorization header.
```

**Documentation**

- API documentation is available using Swagger UI.
- Access Swagger documentation at /api-docs.

**Technologies Used**

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Swagger for API documentation

**Points to Note**

- The sorting is by-default set to "createdAt" in descending order of the createdAt, i.e, the most recently added post will be shown first.
- If you enter sortBy as "title" the sort order will be in the ascending order of the title values.
- For this project, I have not used .env file, instead have created a config file that is added in the root folder.
- In the swagger, for authorization , add "Bearer" followed by the token that you get after login.
